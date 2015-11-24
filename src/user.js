// Model a user

// User operates on a taxapp

var Taxapp = require('./taxapp').Taxapp;

var createUser = function(authId, numRequests, avgThinkTime) {
	var app = new Taxapp(authId); 
	var addNextRequest = function() { 
		var thinkTime = avgThinkTime;
		setTimeout(function() { app.touch(); addNextRequest();}, thinkTime); 
	};
	addNextRequest();
};

module.exports = {
createUser: createUser
};

