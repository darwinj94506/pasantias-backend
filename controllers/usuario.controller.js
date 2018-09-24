'use strict'
var db=require('./../bdd.coneccion');
var bcrypt = require('bcrypt-nodejs');
var jwt=require('../services/jwt');

function crudUsuario(req, res, next) {
    console.log([req.body.idusuario,req.body.nombre,req.body.apellido,req.body.clave,req.body.cedula,req.body.rol,req.body.opcion]);
    var SQL = 'select * from  fun_ime_usuario($1, $2, $3, $4, $5, $6, $7);'
    db.any(SQL,[req.body.idusuario,
      req.body.nombre,
      req.body.apellido,
      req.body.clave,
      req.body.cedula,
      req.body.rol,
      req.body.opcion])
      .then(function (data) {
      res.status(200)
      .json(data);
      })
      .catch(function (err) {
        console.log(err);
        res.status(500)
        .json(err);
      });
}


function getUsuariosSelect(req, res, next) {

    var SQL = 'select * from usuario where estado=1';
    db.any(SQL)
    .then(function (data) {
        res.status(200)
        .json(data);
    })
   c

}




function login(req,res){
    var params=req.body;
    var password=params.clave;
    var id=params.idusuario;
    console.log(password);
    // console.log(params.gettoken);
    db.any('select * from usuario where cedula=$1',id)
      .then(function (user) {
          console.log('usuario traido de bdd:'+user);// user array de json de la tabla usuarios
          if(user[0]==null){
            res.status(200)
            .json({
              status: 'success',
              data: data,
              message: 'No existe este usuario'
            });     
            }else{
                var user=user[0];
                console.log(user.clave+' '+password);
                
                if(password == user.clave){
                    if(params.gettoken){
                        res.status(200).send({
                        token:jwt.createToken(user)
                        });
                    }else{
                    console.log('este es el usuario logueado:'+user);
                    res.status(200).send({user:user});
                    }
                }else{
                res.status(404).send({
                    message:'la contraseña no es correcta'
                });
                }
                
            }    
      })
      .catch(function (err) {
        console.log(err);
        res.status(404).send({
          message:err
         });
      });
  }

  function getTotalUsuarios(req, res, next) {
    db.any("select count(*)  from usuario where estado=1")
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Se obtuvo el total de registros de usuarios'
          });
      })
      .catch(function (err) {
        console.log(err);
        res.status(400).json(err)
      });
  }
  function getUsuarios(req, res, next) {
    var SQL = 'select * from  usuario where estado=1';
    db.any(SQL, [req.body.idusuario,req.body.nombre,req.body.apellido,req.body.rol
      ,req.body.clave,req.body.opcion])
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
  function cambiarClave(req,res,next){
    console.log(req.body);
    var params=req.body;
    var clave=params.clave;
    var nuevaClave=params.nuevaClave;
    var id=params.idusuario;
    
    db.any('select * from usuario where idusuario=$1',id)
      .then(function (user) {
          console.log('usuario traido de bdd cc:'+user);// user array de json de la tabla usuarios
          console.log(user[0]);
          if(user[0]==null){
            res.status(200)
            .json({
              status: 'success',
              data: data,
              message: 'No existe este usuario'
            });     
            }else{
                var user=user[0];
                if(user.clave === clave){ 
                  var SQL = 'update usuario set clave=$1 where idusuario=$2';
                  db.any(SQL, [nuevaClave,id])
                  .then(function (data) {
                    console.log(data);
                    res.status(200)
                      .json({
                        status: 'success',
                        data: data
                      });
                  })
                  .catch(function (err) {
                    res.status(404).send(err);
                  });
               
                }
            }    
      })
      .catch(function (err) {
        console.log(err);
        res.status(500).send({
          message:err
         });
      });
  }
  

module.exports = {
  login:login,
  crudUsuario:crudUsuario,
  getUsuariosSelect:getUsuariosSelect,
  getTotalUsuarios:getTotalUsuarios,
  getUsuarios:getUsuarios,
  cambiarClave:cambiarClave
};
