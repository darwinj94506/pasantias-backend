'use strict'
var jwt=require('jwt-simple');
var moment=require('moment');
var secret='clave_secreta_del_mia';

exports.ensureAuth=function(req,res,next){
  if(!req.headers.authorization){
    return res.status(403).send({message:'la petticon no tiene cabecera'})
  }
  var token=req.headers.authorization.replace(/["'']+/g,'');
  try {
    var payload=jwt.decode(token,secret);
    if(payload.exp<=moment().unix()){
      return res.status(401).send({
        message:'el toque he expirado'
      });
    }
  } catch (e) {
    return res.status(401).send({
      message:'el toque no es valido'
    });

  }
  //yo puedo acceder al usuario logieado en todos los controladores
  req.user=payload;
  next();
};
