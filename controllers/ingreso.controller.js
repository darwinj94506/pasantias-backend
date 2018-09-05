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
    // db.any('SELECT m.idmaterial, m.idtipo, m.nombre, m.stock, m.fecha, m.estado, t.nombre nombretipo, t.fecha fechatipo, t.estado estadotipo FROM material m join tipo t on m.idtipo = t.idtipo where m.estado=1  LIMIT '+itemsPerPage+' OFFSET '+page2)
    // db.any('SELECT * FROM ingreso ORDER BY Fecha DESC LIMIT '+itemsPerPage+' OFFSET '+page2)
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
        req.body.idmaterial,req.body.cantidad,req.body.opcion]);
    var SQL = 'select * from  fun_ime_ingreso($1, $2, $3, $4, $5);';
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
    getTotalIngresos:getTotalIngresos,
    getIngresosPaginacion:getIngresosPaginacion,
    crudIngreso:crudIngreso
 
};
