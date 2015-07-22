var fs = require('fs');
var path = require('path');
var basename = path.basename(module.filename);
var db = {};

fs
	.readdirSync(path.join(__dirname, 'models'))
	.filter(function(file) {
		return (file.indexOf('.') !== 0) 
			&& (file !== basename)
			&& (file.split('.').pop() === 'js');
	})
	.forEach(function(file) {
		db[file.split('.')[0]] = require(path.join(__dirname, file));
	});

module.exports = db;