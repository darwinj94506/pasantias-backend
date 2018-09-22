var promise = require('bluebird');

var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
const connectionString = {
  host: '172.18.1.146',
  port: 5432,
  database: 'inventario',
  user: 'desarrollo',
  password: 'C4S.D3$'
};
var db = pgp(connectionString);

module.exports = db;


// var connectionString = "postgres://postgres:root@localhost:5432/inventariodb2";
