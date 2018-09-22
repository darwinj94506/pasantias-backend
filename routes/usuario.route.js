var express = require('express');
var router = express.Router();
var UsuarioController=require('./../controllers/usuario.controller');

router.post('/crudUsuario', UsuarioController.crudUsuario); 
router.post('/login', UsuarioController.login); 
router.post('/getUsuarios',UsuarioController.getUsuarios);
router.post('/getTotalUsuarios',UsuarioController.getTotalUsuarios)
router.post('/getUsuariosSelect', UsuarioController.getUsuariosSelect); 
router.post('/cambiarclave', UsuarioController.cambiarClave); 


module.exports = router;
