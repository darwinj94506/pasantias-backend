'use strict'

exports.isAdmin=function(req,res,next){
  if(req.user.role != 1){
    return res.status(200).send({message:'no tienes acceso a esta zona'});
  }
  next();
}
