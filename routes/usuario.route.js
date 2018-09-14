var express = require('express');
var router = express.Router();
var UsuarioController=require('./../controllers/usuario.controller');

// router.post('/register', UsuarioController.registrarUsuario); 
router.post('/crudUsuario', UsuarioController.crudUsuario); 
router.post('/login', UsuarioController.login); 
router.post('/getUsuarios',UsuarioController.getUsuarios);
router.post('/getTotalUsuarios',UsuarioController.getTotalUsuarios)

router.post('/getUsuariosSelect', UsuarioController.getUsuariosSelect); 



// router.post('/getTotalTipos', UsuarioController.getTotalTipos); 
// router.get('/getTipo/:id', UsuarioController.getTipo); 
// router.post('/crudTipo', UsuarioController.crudTipo);



module.exports = router;
