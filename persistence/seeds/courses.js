exports.seed = function(knex, Promise) {
	return Promise.all([
		knex('courses').del(),
		knex.raw("SELECT setval('courses_id_seq', 1)")
	])
		.then(function () {
			return knex.transaction(function (trx) {
				return Promise.all([
					trx('courses').insert({
						title: 'Math',
						description: 'Fourth Grade Mathematics',
						created_at: pg_date(),
						updated_at: pg_date()
					}),
					trx('courses').insert({
						title: 'Science',
						description: 'Fifth Grade Science',
						created_at: pg_date(),
						updated_at: pg_date()
					}),
					trx('courses').insert({
						title: 'History',
						description: 'Fourth Grade History',
						created_at: pg_date(),
						updated_at: pg_date()
					})
				])
					.then(function (results) {
						return trx.raw("SELECT setval('courses_id_seq', " + (results.length + 1) + ")");
					});
			});
		});
};

function pg_date() {
	return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
}