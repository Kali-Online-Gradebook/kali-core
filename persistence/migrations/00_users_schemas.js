
exports.up = function (knex, Promise) {
	return Promise.all([
		knex.raw('CREATE SCHEMA IF NOT EXISTS security AUTHORIZATION ' + process.env.DB_USERNAME)
	]);
};

exports.down = function (knex, Promise) {
	return Promise.all([
		knex.raw('DROP SCHEMA IF EXISTS security CASCADE')
	]);
};