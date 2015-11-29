var Cache = require('../src/tomcatcache');

Cache.putFile({authID: 123, safetySave: true, payload: "abc"});
console.log(Cache.cache);
Cache.putFile({authID: 123, safetySave: false, payload: "def"});
console.log(Cache.cache);
Cache.putFile({authID: 123, safetySave: true, payload: "abc"});
console.log(Cache.cache);
Cache.crawlCache(Cache.cache);
console.log(Cache.cache);

setTimeout(function() {
		console.log(Cache.cache);
		Cache.crawlCache(Cache.cache);
		console.log("the authIDs that just got saved to CFP should be deleted from the cache now:\n");
		console.log(Cache.cache);
		Cache.putFile({authID: 123, safetySave: true, payload: "abc"});
		console.log(Cache.cache);
	}, 700);
