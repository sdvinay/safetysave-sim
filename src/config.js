var fs = require('fs');
var nconf = require('nconf');

nconf.file({ file: 'config.json' });

module.exports = {
	config:nconf
};
