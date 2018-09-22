'use strict'
var db=require('./../bdd.coneccion');

  function getTotalIngresos(req, res, next) {
    db.any("select count(*)  from ingreso")
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Se obtuvo el total de registros de la tabla ingreso'
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
  
  function getIngresosPaginacion(req, res, next) {
    console.log(req.body);
    var page=req.body.page;
    var itemsPerPage=req.body.itemsPerPage;
    console.log(page);
    console.log(itemsPerPage);
    var page2=page*itemsPerPage;
    console.log(page2);
    
    db.any('SELECT  material.nombre nombrematerial, usuario.nombre nombreusuario, usuario.apellido, ingreso.fecha fechaingreso, cantidad FROM usuario join ingreso on ingreso.idusuario = usuario.idusuario join material on ingreso.idmaterial = material.idmaterial ORDER BY fechaingreso DESC LIMIT '+itemsPerPage+' OFFSET '+page2)
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'transción exitosa'
          });
      })
      .catch(function (err) {
        return next(err);
      });
    }
  
  function crudIngreso(req, res, next) {
    console.log([req.body.idingreso,req.body.idusuario,
      req.body.idgarantia,req.body.idmaterial,req.body.cantidad,req.body.serie,req.body.descripcion,req.body.opcion]);
    var SQL = 'select * from  fun_ime_ingreso($1, $2, $3, $4, $5, $6, $7, $8);';
    db.any(SQL, [req.body.idingreso,req.body.idusuario,
        req.body.idgarantia,req.body.idmaterial,req.body.cantidad,req.body.serie,req.body.descripcion,req.body.opcion])
    .then(function (data) {
      res.status(200)
        .json(data);
    })
    .catch(function (err) {
      return next(err);
    });
  }

module.exports = {

    getTotalIngresos:getTotalIngresos,
    getIngresosPaginacion:getIngresosPaginacion,
    crudIngreso:crudIngreso
 
};
