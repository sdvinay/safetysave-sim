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
	var now = (new Date()).getTime();
	if (saveTask.timestamp === undefined) {
		saveTask.timestamp = now;
	}
	console.log(now + ": save (safety=" + bSafetySave + "): " + authID);
	cacheEntry = cache[authID];
	if (cacheEntry === undefined) {
		cacheEntry = {};
		cacheEntry.timeOfLastSave = 0;
		cache[authID] = cacheEntry;
	}
	if (bSafetySave) {
		cacheEntry.saveTask = saveTask;
	} else {
		doSave(saveTask);
		cacheEntry.timeOfLastSave = now;
		cacheEntry.saveTask = null;
	}
};

var crawlCache = function(cache) {
	var countSaves = 0;
	var now = new Date().getTime(); 
	var compareTimeStamp = now - conf.SEND_SAFETY_TO_CFP_INTERVAL;
	for (var authID in cache) {
		var cacheEntry = cache[authID];
		if (cacheEntry.timeOfLastSave < compareTimeStamp && cacheEntry.saveTask != null)
		{
			doSave(cacheEntry.saveTask)
			cacheEntry.timeOfLastSave = now;
			delete cacheEntry.saveTask; // TODO not sure this is right
			countSaves++;
		}
	}
	console.log(now + ": crawler saved " + countSaves + " files");
};

var doSave = function(saveTask) {
	var d = new Date();
	console.log(d.getTime() + ": Tomcat cache saves to CFP: " + saveTask.authID + ", safety=" + saveTask.safetySave); 

};

module.exports = {
	putFile: putFile,
	cache:cache, // TODO this is exposed for testing for now
	crawlCache:crawlCache // TODO this is exposed for testing for now
};
