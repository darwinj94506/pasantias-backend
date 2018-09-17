var promise = require('bluebird');

var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = "postgres://postgres:darwin123@localhost:5432/inventariodb2";
var db = pgp(connectionString);

module.exports = db;

