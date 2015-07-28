var bookshelf = require('../../config/db');
var log = require('../../config/logging');
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt'));
var uuid = require('node-uuid');

var hashPassword = function (instance, model, done) {
	bcrypt.genSaltAsync(13)
		.then(function (salt) {
			console.log(instance.get('password'));
			return bcrypt.hashAsync(instance.get('password'), salt);
		})
		.then(function (hash) {
			instance.set('passhash', hash);
			return done();
		})
		.catch(done);
};

module.exports = bookshelf.Model.extend({
	tableName: 'security.users',
	hasTimestamps: true,
	defaults: {
		user_id: uuid.v4()
	},
	initialize: function () {

	},
	checkPassword: function (password) {
		var user = this;

		return bcrypt.compareAsync(password, this.attributes.passhash)
			.then(function (match) {
				if (!match) throw new Error('Invalid username or password.');

				return user;
			})
			.catch(function (error) {
				console.error(error);
			});
	},
}, {
	checkUsername: function (username) {
		return new this({ username: username })
			.fetch({
				columns: ['user_id', 'username', 'passhash', 'last_login', 'created_at', 'updated_at']
			});
	},
	get: function (id) {
		return new this({ user_id: id })
			.fetch({
				columns: ['user_id', 'username', 'last_login', 'created_at', 'updated_at']
			});
	},
	add: function (user) {
		return this.forge({
			user_id: user.userId || undefined,
			username: user.username
		})
			.save()
			.then(function (model) {
				var user = Object.assign({}, model.attributes);
				delete user.id;
				delete user.passhash;
				return user;
			});
	},
	update: function (user, id) {
		return new this({ user_id: id })
			.fetch({ require: true })
			.then(function (model) {
				return model.save({ username: user.username }, { patch: true });
			})
			.then(function (model) {
				var user = Object.assign({}, model.attributes);
				delete user.id;
				delete user.passhash;
				return user;
			});
	}
});