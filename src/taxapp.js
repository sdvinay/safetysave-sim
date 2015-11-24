// Models the TTO taxapp's persistence logic.

// Public methods (called by user)
// start() // starts a session.  Does an initial write(?)
// touch() // marks the last accessed time, possibly triggers safety save
// exit()   // does a full save

// Internal logic

// Do safety save after SAFETY_SAVE_INTERVAL seconds have passed()
//   Triggered by touch()
// Do full save on exit()
// Expire after INACTIVITY_TIMEOUT seconds have passed
//   Triggered by recurring idle thread (IDLE_THREAD_INTERVAL)

// Internal state
//   authID
//   lastSaveTime
//   lastAccessTime

// Configuration
// SAFETY_SAVE_INTERVAL
// INACTIVITY_TIMEOUT
// IDLE_THREAD_INTERVAL

var Taxapp = function(authID) {
	this.authID = authID;
};

Taxapp.prototype.start = function() {
	// TODO
	this.log('start');
};

Taxapp.prototype.touch = function() {
	// TODO
};

Taxapp.prototype.exit = function() {
	// TODO
};

Taxapp.prototype.log = function(message) {
	var d = new Date();
	console.log(d.getTime() + ": " + this.authID + ": " + message);
	// TODO
};

module.exports = {
	Taxapp: Taxapp
};
