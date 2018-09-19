'use strict'
var db=require('./../bdd.coneccion');
var bcrypt = require('bcrypt-nodejs');
var jwt=require('../services/jwt');

   
function getUsuariosSelect(req, res, next) {
    var SQL = 'select * from usuario';
    db.any(SQL)
    .then(function (data) {
        res.status(200)
        .json(data);
    })
    .catch(function (err) {
        return next(err);
    });
}
//egresos
  function getEgresoDetalle(req, res, next) {
    var serie=req.body.serie;
    console.log(req.body.fecha1);
    console.log(req.body.fecha2);

    var SQL = 'SELECT m.nombre material, i.serie, g.descripcion garantia, p.nombre proveedor, d.cantidad, d.idegreso, u.nombre usuario, s.nombre solicitante,e.fecha FROM detalle_egreso d JOIN ingreso i ON i.idingreso = d.idingreso JOIN material m ON m.idmaterial = i.idmaterial JOIN garantia g ON g.idgarantia= i.idgarantia JOIN egreso e ON e.idegreso=d.idegreso JOIN usuario u ON u.idusuario = e.idusuario JOIN usuario s ON s.idusuario=e.idsolicitante JOIN proveedor p ON p.idproveedor=g.idproveedor where s.idusuario=$1 or u.idusuario=$2 or i.serie=$3 or e.fecha BETWEEN $4 AND $5';
    db.any(SQL,[req.body.idusuario,req.body.idsolicitante,req.body.serie,req.body.fecha1,req.body.fecha2])
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Se ejecuto '
        });
    })
    .catch(function (err) {
      console.log(err);
      return next(err);
    });
  }
  //ingresos
  function getReporteIngreso(req, res, next) {
    var serie=req.body.serie;
    var SQL = 'SELECT m.nombre material,i.serie,i.fecha, g.descripcion garantia,p.nombre proveedor,u.nombre usuario FROM ingreso i JOIN material m ON m.idmaterial = i.idmaterial JOIN garantia g ON g.idgarantia= i.idgarantia JOIN usuario u ON u.idusuario = i.idusuario JOIN proveedor p ON p.idproveedor=g.idproveedor where u.idusuario=$1 or i.serie=$2 or i.fecha BETWEEN $3 AND $4';
    db.any(SQL,[req.body.idusuario,req.body.serie,req.body.fecha1,req.body.fecha2])
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Se ejecuto '
        });
    })
    .catch(function (err) {
      console.log(err);
      return next(err);
    });
  }
  

module.exports = {
    getEgresoDetalle:getEgresoDetalle,
    getReporteIngreso:getReporteIngreso
};
