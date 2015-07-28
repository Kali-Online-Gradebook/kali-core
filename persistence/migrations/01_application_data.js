
exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.createTable('assignments', function (table) {
			table.bigIncrements('id').primary();
			table.integer('course_id')
				.notNullable()
				.index()
				.references('id')
				.inTable('courses');
			table.string('name');
			table.text('comment');
			table.bigInteger('maximum').unsigned();
			table.float('weight');

			table.timestamps();
		}),
		knex.schema.createTable('courses', function (table) {
			table.bigIncrements('id').primary();
			table.string('title').notNullable();
			table.text('description');

			table.timestamps();
		}),
		knex.schema.createTable('students', function (table) {
			table.bigIncrements('id').primary();
			table.uuid('student_id').notNullable();
			table.string('name').notNullable();

			table.timestamps();
		}),
		knex.schema.createTable('grades', function (table) {
			table.bigIncrements('id').primary();
			table.bigInteger('students_id')
				.unsigned()
				.notNullable()
				.index()
				.references('id')
				.inTable('students');
			table.bigInteger('assignment_id')
				.unsigned()
				.notNullable()
				.index()
				.references('id')
				.inTable('assignments');
			table.integer('grade').unsigned();
			table.text('comment');

			table.timestamps();
		}),
		knex.schema.createTable('course_assignments', function (table) {
			table.primary(['courses_id', 'assignment_id']);
			table.bigInteger('courses_id')
				.unsigned()
				.notNullable()
				.index()
				.references('id')
				.inTable('courses');
			table.bigInteger('assignment_id')
				.unsigned()
				.notNullable()
				.index()
				.references('id')
				.inTable('assignments');
		})
	]);
};

exports.down = function(knex, Promise) {
	return knex.transaction(function (trx) {
		return Promise.all([
			trx.raw('DROP TABLE assignments CASCADE'),
			trx.raw('DROP TABLE courses CASCADE'),
			trx.raw('DROP TABLE students CASCADE'),
			trx.raw('DROP TABLE grades CASCADE'),
			trx.raw('DROP TABLE course_assignments CASCADE')
		]);
	});
};
