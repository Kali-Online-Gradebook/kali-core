var knex = require('knex')({
	client: 'postgres',
	connection: {
		host: process.env.DB_HOSTNAME,
		user: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		charset: 'utf8'
	}
});

var bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;