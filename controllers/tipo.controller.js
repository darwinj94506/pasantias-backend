'use strict'
var db=require('./../bdd.coneccion');

function getTiposSelect(req, res, next) {
  console.log(db);
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
    var page2=page*itemsPerPage;
    console.log(page2);
    db.any('SELECT * FROM tipo where estado=1 ORDER BY Fecha DESC LIMIT '+itemsPerPage+' OFFSET '+page2)
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
    var SQL = 'select * from  fun_ime_tipo($1, $2,$3);';
    db.any(SQL, [req.body.idtipo,req.body.nombre,req.body.opcion])
    .then(function (data) {
      res.status(200)
        .json(data);
    })
    .catch(function (err) {
      return next(err);
    });
  }

module.exports = {
  getTiposSelect: getTiposSelect,
  getTipo:getTipo,
  crudTipo: crudTipo,
  getTiposPaginacion: getTiposPaginacion,
  getTotalTipos:getTotalTipos
 
};
