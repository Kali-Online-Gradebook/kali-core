var fs = require('fs');
var path = require('path');
var basename = path.basename(module.filename);
var db = {};
var modelpath = path.join(__dirname, 'app/models');

fs
	.readdirSync(modelpath)
	.filter(function(file) {
		return (file.indexOf('.') !== 0) 
			&& (file !== basename)
			&& (file.split('.').pop() === 'js');
	})
	.forEach(function(file) {
		db[file.split('.')[0]] = require(path.join(modelpath, file));
	});

module.exports = db;