'use strict'
var db=require('./../bdd.coneccion');

  function getProveedoresSelect(req, res, next){
    console.log(req);
    let id=req.params.id;
    db.any('select * from proveedor where estado=1')
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'se optuvo los proveedores'
          });
      })
      .catch(function (err) {
        console.log(err);
        res.status(400).json(err)
      });
  }
  
  function crudProveedor(req, res, next) {
    console.log([req.body.idproveedor,req.body.nombre,req.body.estado,]);
    var SQL = 'select * from  fun_ime_proveedor($1, $2, $3, $4, $5, $6,$7,$8);';
    db.any(SQL, [req.body.idproveedor,req.body.nombre,req.body.telefono1,req.body.telefono2
      ,req.body.email,req.body.direccion,req.body.ruc,req.body.opcion])
    .then(function (data) {
      res.status(200)
        .json( data);
    })
    .catch(function (err) {
      console.log(err);
      res.status(400).json(err)
    });
  }

  function getProveedores(req, res, next) {
    var SQL = 'select * from  proveedor where estado=1';
    console.log([req.body.idproveedor,req.body.nombre,req.body.telefono1,req.body.telefono2
      ,req.body.email,req.body.direccion,req.body.ruc,req.body.opcion]);
    db.any(SQL, [req.body.idproveedor,req.body.nombre,req.body.telefono1,req.body.telefono2
      ,req.body.email,req.body.direccion,req.body.ruc,req.body.opcion])
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
      res.status(400).json(err)
    });
  }

  function getTotalProveedores(req, res, next) {
    db.any("select count(*)  from proveedor where estado=1")
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Se obtuvo el total de registros de la tabla tipo'
          });
      })
      .catch(function (err) {
        console.log(err);
        res.status(400).json(err)
      });
  }
  

module.exports = {
  getProveedoresSelect:getProveedoresSelect,
  crudProveedor: crudProveedor,
  getProveedores:getProveedores,
  getTotalProveedores:getTotalProveedores
 
};
