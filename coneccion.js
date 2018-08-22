var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = "postgres://postgres:darwin123@localhost:5432/inventariodb";
var db = pgp(connectionString);

// add query functions
function getAllPuppies(req, res, next) {
    db.any('select * from tipo')
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved ALL tipos'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }

  function createPuppy(req, res, next) {
    console.log([req.body.idtipo,req.body.nombre,req.body.estado,req.body.fecha]);
    var SQL = 'select * from  into tipo(idtipo, nombre, estado, fecha) values($1, $2, $3, $4);';
    db.any(SQL, [req.body.idtipo,req.body.nombre,req.body.estado,req.body.fecha])
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Se inserto'
        });
    })
    .catch(function (err) {
      return next(err);
    });
  }



module.exports = {
  getAllPuppies: getAllPuppies,
//   getSinglePuppy: getSinglePuppy,
  createPuppy: createPuppy,
//   updatePuppy: updatePuppy,
//   removePuppy: removePuppy
};
