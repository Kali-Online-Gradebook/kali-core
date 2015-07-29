var bookshelf = require('../config/db');
var log = require('../config/logging');

module.exports = bookshelf.Model.extend({
	tableName: 'courses',
	hasTimestamps: true,
	initialize: function () {

	}
}, {
	all: function () {
		return this.collection().fetch();
	},
	get: function (id) {
		return new this({ id: id })
			.fetch();
	},
	add: function (course) {
		return this.forge({
			title: course.title,
			description: course.description
		})
			.save()
			.then(function (model) {
				var course = Object.assign({}, model.attributes);
				return course;
			});
	},
	update: function (student, id) {
		return new this({ id: id })
			.fetch({ require: true })
			.then(function (model) {
				return model.save({ title: course.title, description: course.description }, { patch: true });
			})
			.then(function (model) {
				var course = Object.assign({}, model.attributes);
				return course;
			});
	}
});