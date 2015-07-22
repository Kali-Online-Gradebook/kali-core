var bunyan = require('bunyan');

module.exports = bunyan.createLogger({
	name: 'kali-core',
	stream: process.stdout,
	level: 'trace'
});