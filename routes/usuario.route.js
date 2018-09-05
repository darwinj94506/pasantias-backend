var express = require('express');
var router = express.Router();
var UsuarioController=require('./../controllers/usuario.controller');

// router.post('/register', UsuarioController.registrarUsuario); 
router.post('/crudUsuario', UsuarioController.crudUsuario); 
router.post('/login', UsuarioController.login); 


// router.post('/getTotalTipos', UsuarioController.getTotalTipos); 
// router.get('/getTipo/:id', UsuarioController.getTipo); 
// router.post('/crudTipo', UsuarioController.crudTipo);



module.exports = router;
