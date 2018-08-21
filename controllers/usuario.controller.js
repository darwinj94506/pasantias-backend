'use strict'
//modulos
// var bcrypt = require('bcrypt-nodejs');
// fs    libreria del sistema de ficheros de node
//  var fs =require('fs');
 var path=require('path');
//modelos
var User =require('../models/usuario.model');
//servico
// var jwt=require('../services/jwt');
//acciones
function pruebas(req,res){
  res.status(200).send({
    message:'probando controlador usuarios y la accion pruebas',
    user:req.user
  });
}


module.exports={
    pruebas
  };