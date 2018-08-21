var express = require('express');
var router = express.Router();
var UsuarioController=require('../controllers/usuario.controller');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/pruebas-del-controlador',UsuarioController.pruebas);


module.exports = router;
