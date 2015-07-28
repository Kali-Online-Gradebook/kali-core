require('dotenv').load();
var gulp = require('gulp-help')(require('gulp'));
var knex = function () {
	return require('knex')({
		client: 'postgresql',
		connection: {
			host: process.env.DB_HOSTNAME,
			user: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
			charset: 'utf8'
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'migrations'
		}
	});
};
var path = require('path');
var Promise = require('bluebird');
var mocha = require('gulp-mocha');

var paths = {
	persistence: 'persistence',
	unittests: './tests/unit/**/*.spec.js'
};

gulp.task('migrate:latest', 'Kick the database to the latest migration.', function () {
	process.chdir(path.join(process.cwd(), paths.persistence));
	var db = knex();

	return db.migrate.latest({
		migrations: {
			tableName: 'migrations'
		}
	})
		.then(function () {
			return db.migrate.currentVersion();
		})
		.then(function (version) {
			console.log("Kicked database to version: " + version);
			db.destroy();
		})
		.catch(function (err) {
			console.error(err);
			db.destroy();
		});
});

gulp.task('migrate:rollback', 'Undo the database migrations.',  function () {
	process.chdir(path.join(process.cwd(), paths.persistence));
	var db = knex();

	return knex().migrate.rollback({
		migrations: {
			tableName: 'migrations'
		}
	})
		.then(function () {
			return db.migrate.currentVersion();
		})
		.then(function (version) {
			console.log("Reverted database to version: " + version);
			db.destroy();
		})
		.catch(function (err) {
			console.error(err);
			db.destroy();
		});
});

gulp.task('seed:run', 'Populate the database with test data.',  function () {
	process.chdir(path.join(process.cwd(), paths.persistence));
	var db = knex();

	return db.seed.run({})
		.then(function (version) {
			console.log("Seeded database.");
			db.destroy();
		})
		.catch(function (err) {
			console.error(err);
			db.destroy();
		});
});

gulp.task('test', 'Run the kali-core unit tests.', function () {
	return gulp.src(paths.unittests)
		.pipe(mocha({ reporter: 'spec' }));
});
