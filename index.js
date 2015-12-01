var Taxapp = require('./src/taxapp').Taxapp;
var config = require('./src/config').config;
var User = require('./src/user');
var cache = require('./src/tomcatcache');

var crawl_interval = config.get('tomcatcache').CACHE_CRAWL_INTERVAL;
setInterval(function() { cache.crawlCache(cache.cache)}, crawl_interval);

var app1 = new Taxapp(1234);
var app2 = new Taxapp(5678);
app1.start();
app2.start();
app1.touch();
app1.touch();
app2.touch();
app1.touch();
var app3 = new Taxapp(9012);
app3.start();
app3.touch();

console.log(config.get('taxapp'));
console.log(config.get('taxapp').SAFETY_SAVE_INTERVAL);
console.log(config.get('taxapp:SAFETY_SAVE_INTERVAL'));

setTimeout(function() { app3.touch();}, 300);
setTimeout(function() { app3.touch();}, 400);
setTimeout(function() { app3.touch();}, 500);

User.createUser(8288, 80, 30);

var authId = 1000;
setInterval(function() { User.createUser(authId++, 80, 30);}, 100);
