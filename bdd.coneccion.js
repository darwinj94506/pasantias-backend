var promise = require('bluebird');
var options = {
  promiseLib: promise,
  error: function (error, e) {
    if (e.cn) {
        // A connection-related error;
        console.log("CN:", e.cn);
        console.log("EVENT:", error.message);
    }
}
};

var pgp = require('pg-promise')(options);
const connectionString = "postgres://postgres:root@localhost:5432/inventariodb2";
// const connectionString = {
//   host: '172.18.1.146',
//   port: 5432,
//   database: 'inventario',
//   user: 'desarrollo',
//   password: 'C4S.D3$'
// };
var db = pgp(connectionString);

module.exports = db;







