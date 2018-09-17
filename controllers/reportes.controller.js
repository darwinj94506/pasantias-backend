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

  function getEgresoDetalle(req, res, next) {
    console.log("sssssssss");
      var serie=req.body.serie;
      console.log(serie);
    var SQL = 'SELECT * from ingreso';
    db.any(SQL)
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
    getEgresoDetalle:getEgresoDetalle
};
