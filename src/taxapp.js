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

var conf = require('./config').config.get('taxapp');
var Cache = require('./tomcatcache');

var Taxapp = function(authID) {
	this.authID = authID;
	this.lastSaveTime = 0;
	this.lastAccessTime = 0;
};

Taxapp.prototype.start = function() {
	this.log('start');
	this.touch();
	// TODO start the "idle thread" (it's not a thread in node)
};

Taxapp.prototype.touch = function() {
	this.log('touch');
	var d = new Date();
	this.lastAccessTime = d.getTime();
	if (this.shouldSafetySave() === true) {
		this.doSafetySave();
	}
};

Taxapp.prototype.exit = function() {
	this.log('exit');
	this.doSave(false);
};

Taxapp.prototype.log = function(message) {
	var d = new Date();
	console.log(d.getTime() + ": " + this.authID + ": " + message);
};

Taxapp.prototype.shouldSafetySave = function() {
	var d = new Date();
	return ((d.getTime() - this.lastSaveTime) > conf.SAFETY_SAVE_INTERVAL);
};

Taxapp.prototype.doSafetySave = function() {
	this.log('doSafetySave');
	this.doSave(true);
};

Taxapp.prototype.doSave = function(bSafetySave) {
	var saveTask = {};
	saveTask.authID = this.authID;
	saveTask.safetySave = bSafetySave;
	saveTask.timestamp = 0;
	saveTask.payload = "foo";
	Cache.putFile(saveTask);
};


module.exports = {
	Taxapp: Taxapp
};
