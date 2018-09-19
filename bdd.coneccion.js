var promise = require('bluebird');

var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = "postgres://postgres:root@localhost:5432/inventariodb";
var db = pgp(connectionString);

module.exports = db;

