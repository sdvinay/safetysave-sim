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

// saveTask has authID, safetySave, timestamp, payload
var cache = {};
var putFile = function(saveTask) {
	var authID = saveTask.authID;
	var bSafetySave = saveTask.safetySave;
	cacheEntry = cache[authID];
	if (cacheEntry === undefined) {
		cacheEntry = {};
		cache[authID] = cacheEntry;
	}
	if (bSafetySave) {
		cacheEntry.saveTask = saveTask;
	} else {
		//doSave(saveTask);
		cacheEntry.timeOfLastSave = new Date().getTime();
		cacheEntry.saveTask = null;
	}
};

module.exports = {
	putFile: putFile,
	cache:cache
};
