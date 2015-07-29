var uuid = require('node-uuid');
var bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {
	return Promise.all([
		knex('security.roles').del(),
		knex('security.users').del(),
		knex.raw("SELECT setval('security.roles_id_seq', 1)"),
		knex.raw("SELECT setval('security.users_id_seq', 1)"),
	])
		.then(function () {
			return knex.transaction(function (trx) {
				return Promise.all([
					trx.insert({
						id: 1,
						role_id: uuid.v4(),
						title: 'Administrator',
						description: 'Grants administrative privileges within the application.	',
						created_at: pg_date(),
						updated_at: pg_date()
					}).into('security.roles'),
					trx.insert({
						id: 2,
						role_id: uuid.v4(),
						title: 'Teacher',
						description: 'Read, add, and update students, courses, and grades.',
						created_at: pg_date(),
						updated_at: pg_date()
					}).into('security.roles')
				])
					.then(function () {
						return Promise.all([
							trx.insert({
								user_id: uuid.v4(),
								role_id: 1,
								username: 'administrator',
								passhash: bcrypt.hashSync('password', bcrypt.genSaltSync(13)),
								last_login: null,
								created_at: pg_date(),
								updated_at: pg_date()
							}).into('security.users')
						]);
					})
					.then(function (results) {
						return trx.raw("SELECT setval('security.users_id_seq', " + (results.length + 1) + ")");
					});
			});
		});
};

function pg_date() {
	return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
}