var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};
var pgp = require('pg-promise')(options);
var connectionString = "postgres://postgres:root@localhost:5432/inventariodb";
var db = pgp(connectionString);

// add query functions
function getTipos(req, res, next) {
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

  //se recupera el total de tipos para la paginacion
  // select count(*)
  // from libros
  // where editorial='Planeta'
  function getTotalTipos(req, res, next) {
    db.any("select count(*)  from tipo where estado=1")
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Se obtuvo el total de registros de la tabla tipo'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }


  function getTipo(req, res, next){
    console.log(req);
    let id=req.params.id;
    db.any('select * from tipo where idtipo='+id)
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'se optuvo el material'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }
  
  function getTiposPaginacion(req, res, next) {
    console.log(req.body);
    var page=req.body.page;
    var itemsPerPage=req.body.itemsPerPage;
    console.log(page);
    console.log(itemsPerPage);
    //db.any('SELECT * FROM tipo LIMIT {'+itemsPerPage+'} OFFSET {('+page - 1+') * '+itemsPerPage+'}')
    // [LIMIT { number | ALL }] [OFFSET number]
    // db.any('SELECT * FROM tipo LIMIT 7 OFFSET 7')

    page2=page*itemsPerPage;
    db.any('SELECT * FROM tipo LIMIT '+itemsPerPage+' OFFSET '+page2)
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

  function crudTipo(req, res, next) {
    console.log([req.body.idtipo,req.body.nombre,req.body.estado,req.body.fecha]);
    var SQL = 'select * from  fun_ime_tipo($1, $2, $3);';
    db.any(SQL, [req.body.idtipo,req.body.nombre,req.body.opcion])
    .then(function (data) {
      res.status(200)
        .json(data);
    })
    .catch(function (err) {
      return next(err);
    });
  }
function crudMaterial(req,res,next){
  var SQL = 'select * from  fun_ime_material($1, $2, $3,$4);';
  db.any(SQL,[req.body.idmaterial,req.body.idtipo,req.body.nombre, req.body.opcion])
  .then(function(data){
    res.status(200)
    .json(data);
  })
  .catch(function(err){
    return next(err);
  });

}
function getMateriales(req, res, next){
var page=req.body.page;
var itemsPerPage=req.body.itemsPerPage;
console.log(page);
console.log(itemsPerPage);
console.log(req.body);
console.log(req.body.itemsPerPage);
page2=page*itemsPerPage;
db.any('SELECT m.idmaterial, m.idtipo, m.nombre, m.stock, m.fecha, m.estado, t.nombre nombretipo, t.fecha fechatipo, t.estado estadotipo FROM material m join tipo t on m.idtipo = t.idtipo where m.estado=1  LIMIT '+itemsPerPage+' OFFSET '+page2)
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
function getTotalMateriales(req, res, next) {
  db.any("select count(*)  from material where estado=1")
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Se obtuvo el total de registros de la tabla tipo'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}



module.exports = {
  getTipos: getTipos,
  getTipo:getTipo,
// getSinglePuppy: getSinglePuppy,
  crudTipo: crudTipo,
  getTiposPaginacion: getTiposPaginacion,
  getTotalTipos:getTotalTipos,
  crudMaterial: crudMaterial,
  getMateriales:getMateriales,
  getTotalMateriales:  getTotalMateriales
// updatePuppy: updatePuppy,
// removePuppy: removePuppy
};
