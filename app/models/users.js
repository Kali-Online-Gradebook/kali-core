var bookshelf = require('../config/db');
var log = require('../config/logging');
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt'));

var hashPassword = function (instance, model, done) {
	if (!instance.changed('password')) return done();

	bcrypt.genSaltAsync(13)
		.then(function (salt) {
			console.log(instance.get('password'));
			return bcrypt.hashAsync(instance.get('password'), salt);
		}).then(function (hash) {
			instance.set('passhash', hash);
			return done();
		}).catch(done);
};

module.exports = bookshelf.Model.extend({
	tableName: 'users',
});