
exports.up = function (knex, Promise) {
	return Promise.all([
		knex.schema.createTable('security.users', function (table) {
			table.bigIncrements('id').primary();
			table.uuid('user_id')
				.unique()
				.index()
				.notNullable();
			table.bigInteger('role_id')
				.notNullable()
				.references('id')
				.inTable('security.roles');
			table.string('username')
				.unique()
				.notNullable();
			table.string('passhash')
				.notNullable();
			table.dateTime('last_login');

			table.timestamps();
		}),
		knex.schema.createTable('security.roles', function (table) {
			table.bigIncrements('id').primary();
			table.uuid('role_id')
				.unique()
				.index()
				.notNullable();
			table.string('title')
				.unique()
				.notNullable();
			table.text('description');

			table.timestamps();
		}),
		knex.schema.createTable('security.permissions', function (table) {
			table.bigIncrements('id').primary();
			table.string('code')
				.unique()
				.notNullable();
			table.string('title')
				.notNullable();
			table.text('description');

			table.timestamps();
		}),
		knex.schema.createTable('security.roles_permissions', function (table) {
			table.bigInteger('role_id')
				.index()
				.notNullable()
				.references('id')
				.inTable('security.roles');
			table.bigInteger('permission_id')
				.index()
				.notNullable()
				.references('id')
				.inTable('security.permissions');
			table.primary(['role_id', 'permission_id']);
		})
	]);
};

exports.down = function (knex, Promise) {
	return knex.transaction(function (trx) {
		return Promise.all([
			trx.raw('DROP TABLE users CASCADE'),
			trx.raw('DROP TABLE roles CASCADE'),
			trx.raw('DROP TABLE permissions CASCADE'),
			trx.raw('DROP TABLE roles_permissions CASCADE'),
		]);
	});
};