var Cache = require('../src/tomcatcache');

Cache.putFile({authID: 123, safetySave: true, timestamp: 0, payload: "abc"});
console.log(Cache.cache);
Cache.putFile({authID: 123, safetySave: false, timestamp: 1, payload: "def"});
console.log(Cache.cache);
Cache.putFile({authID: 123, safetySave: true, timestamp: 0, payload: "abc"});
console.log(Cache.cache);
