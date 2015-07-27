var uuid = require('node-uuid');
var bookshelf = require('../config/db');
var log = require('../config/logging');
Object.assign = Object.assign || require('object.assign');

module.exports = bookshelf.Model.extend({
	tableName: 'students',
	hasTimestamps: true,
	defaults: {
		student_id: uuid.v4()
	},
	initialize: function () {

	},
}, {
	all: function () {
		return this.collection().fetch({
			columns: ['student_id', 'name', 'updated_at', 'created_at']
		});
	},
	get: function (id) {
		return new this({ student_id: id })
			.fetch({
				columns: ['student_id', 'name', 'updated_at', 'created_at']
			});
	},
	add: function (student) {
		return this.forge({
			student_id: student.studentId || undefined,
			name: student.name
		})
			.save()
			.then(function (model) {
				var student = Object.assign({}, model.attributes);
				delete student.id;
				return student;
			});
	},
	update: function (student, id) {
		return new this({ student_id: id })
			.fetch({ require: true })
			.then(function (model) {
				return model.save({ name: student.name }, { patch: true });
			})
			.then(function (model) {
				var student = Object.assign({}, model.attributes);
				delete student.id;
				return student;
			});
	}
});