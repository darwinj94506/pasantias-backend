'use strict'
var db=require('./../bdd.coneccion');

  function getTotalEgresos(req, res, next) {
    db.any("select count(*)  from egreso")
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'transacción exitosa'
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
  
  function getEgresosPaginacion(req, res, next) {
    console.log(req.body);
    var page=req.body.page;
    var itemsPerPage=req.body.itemsPerPage;
    console.log(page);
    console.log(itemsPerPage);
    var page2=page*itemsPerPage;
    console.log(page2);
    // db.any('SELECT m.idmaterial, m.idtipo, m.nombre, m.stock, m.fecha, m.estado, t.nombre nombretipo, t.fecha fechatipo, t.estado estadotipo FROM material m join tipo t on m.idtipo = t.idtipo where m.estado=1  LIMIT '+itemsPerPage+' OFFSET '+page2)
    // db.any('SELECT  material.nombre nombrematerial, usuario.nombre nombreusuario, usuario.apellido, ingreso.fecha fechaingreso, cantidad FROM usuario join ingreso on ingreso.idusuario = usuario.idusuario join material on ingreso.idmaterial = material.idmaterial ORDER BY fechaingreso DESC LIMIT '+itemsPerPage+' OFFSET '+page2)

    db.any('SELECT  material.nombre nombrematerial, usuario.nombre nombreusuario, usuario.apellido, egreso.fecha fechaegreso, cantidad FROM usuario join egreso on egreso.idusuario = usuario.idusuario join material on egreso.idmaterial = material.idmaterial ORDER BY fechaegreso DESC LIMIT '+itemsPerPage+' OFFSET '+page2)
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
  
  function crudEgreso(req, res, next) {
    console.log([req.body.idingreso,req.body.idusuario,
        req.body.idmaterial,req.body.cantidad,req.body.opcion]);
    var SQL = 'select * from  fun_ime_egreso($1, $2, $3, $4, $5);';
    db.any(SQL, [req.body.idingreso,req.body.idusuario,
        req.body.idmaterial,req.body.cantidad,req.body.opcion])
    .then(function (data) {
      res.status(200)
        .json(data);
    })
    .catch(function (err) {
      return next(err);
    });
  }

module.exports = {
//   getTipos: getTipos,
//   getTipo:getTipo,
//   crudTipo: crudTipo,
//   getTiposPaginacion: getTiposPaginacion,
    getTotalEgresos:getTotalEgresos,
    getEgresosPaginacion:getEgresosPaginacion,
    crudEgreso:crudEgreso
 
};
