var Taxapp = require('./src/taxapp').Taxapp;

var app1 = new Taxapp(1234);
var app2 = new Taxapp(5678);
app1.start();
app2.start();
