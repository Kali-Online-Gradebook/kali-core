var fs = require('fs');
var path = require('path');
var dir = require('node-dir');
var modelpath = path.join(__dirname, 'app/models');
var db = {};

dir.files(modelpath, function (err, files) {
	if (err) {
		console.error(err.stack);
		throw err;
	}

	files.forEach(function (file) {
		db[path.basename(file).split('.')[0]] = require(file);
	});
});

module.exports = db;