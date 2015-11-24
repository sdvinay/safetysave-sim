var Taxapp = require('./src/taxapp').Taxapp;
var config = require('./src/config').config;

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