var app = require('./app');
var port = process.env.PORT || 3002;
var promise = require('bluebird');
/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || '3002');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

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
// const connectionString = "postgres://postgres:root@localhost:5432/inventariodb2";
const connectionString = {
  host: '172.18.1.146',
  port: 5432,
  database: 'inventario',
  user: 'desarrollo',
  password: 'C4S.D3$'
};
var db = pgp(connectionString);

module.exports = db;

db.connect()
  .then(function (obj) {
      obj.done(); // success, release connection;
      server.listen(port,()=>{
        console.log('Coneccion a la BDD inventario exitosa, El servidor escucha en el puerto:'+port)
      });
      server.on('error', onError);
      server.on('listening', onListening);
  })
  .catch(function (error) {
      console.log("ERROR en la coneccion a la base de datos:", error.message);
  });

