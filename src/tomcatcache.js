// Models TTO's tomcat cache of tax files

// Public methods (called by taxapp)
// save(saveTask)
// persistCachedSave(authID)

// cache is indexed by auth ID
// each record has timeOfLastSave, latest saveTask

// Internal logic
// On safety save: 
//   Update cache entry with current saveTask
// On full save:
//   Send save all the way to CFP
//   In the cache, update the timeOfLastSave
//   In the cache, Clear the current saveTask 
// CacheCrawler:
//   Wakes up every CACHE_CRAWL_INTERVAL seconds
//   Iterate over cache entries
//      If timeOfLastSave > SEND_SAFETY_TO_CFP_INTERVAL
//        send saveTask to CFP
//        delete cache entry

var conf = require('./config').config.get('tomcatcache');

// saveTask has authID, safetySave, timestamp, payload
var cache = {};
var putFile = function(saveTask) {
	var authID = saveTask.authID;
	var bSafetySave = saveTask.safetySave;

	if (saveTask.timestamp === undefined) {
		saveTask.timestamp = (new Date()).getTime();
	}
	console.log("save (safety=" + bSafetySave + "): " + authID);
	cacheEntry = cache[authID];
	if (cacheEntry === undefined) {
		cacheEntry = {};
		cache[authID] = cacheEntry;
	}
	if (bSafetySave) {
		cacheEntry.saveTask = saveTask;
	} else {
		doSave(saveTask);
		cacheEntry.timeOfLastSave = new Date().getTime();
		cacheEntry.saveTask = null;
	}
};

var crawlCache = function(cache) {
	var compareTimeStamp = new Date().getTime() - conf.SEND_SAFETY_TO_CFP_INTERVAL;
	for (var authID in cache) {
		var cacheEntry = cache[authID];
		if (cacheEntry.timeOfLastSave < compareTimeStamp)
		{
			doSave(cacheEntry.saveTask)
			delete cache.authID; // TODO this isn't right
		}
	}
};

var doSave = function(saveTask) {
	var d = new Date();
	console.log(d.getTime() + ": Tomcat cache saves to CFP: " + saveTask.authID); 

};

module.exports = {
	putFile: putFile,
	cache:cache, // TODO this is exposed for testing for now
	crawlCache:crawlCache // TODO this is exposed for testing for now
};
