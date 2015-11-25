// Model a user

// User operates on a taxapp

var Taxapp = require('./taxapp').Taxapp;

var createUser = function(authId, avgNumRequests, avgThinkTime) {
	var app = new Taxapp(authId); 
	app.start();
	var addNextRequest = function() { 
		// thinkTime is anywhere from 0 to 2*average
		var thinkTime = ((2*avgThinkTime)*Math.random());
		setTimeout(function() { 
			// exit with the probability of 1/avgNumRequests
			if ((avgNumRequests * Math.random()) < 1) {
				app.exit();
			} else {
				app.touch(); 
				addNextRequest();
			}
		}, thinkTime); 
	};
	addNextRequest();
};

module.exports = {
createUser: createUser
};

