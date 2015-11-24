// Model a user

// User operates on a taxapp

var Taxapp = require('./taxapp').Taxapp;

var createUser = function(authId, numRequests, avgThinkTime) {
	var app = new Taxapp(authId); 
	var addNextRequest = function() { 
		var thinkTime = ((2*avgThinkTime)*Math.random());
		setTimeout(function() { 
			if ((numRequests * Math.random()) < 1) {
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

