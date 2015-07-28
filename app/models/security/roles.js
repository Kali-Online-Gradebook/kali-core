var bookshelf = require('../../config/db');
var log = require('../../config/logging');

module.exports = bookshelf.Model.extend({
	tableName: 'security.roles'
});