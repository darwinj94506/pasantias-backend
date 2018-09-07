var express = require('express');
var router = express.Router();
var IngresoController=require('./../controllers/ingreso.controller');

// router.post('/getTipos',MaterialController.getTiposPaginacion); 
// router.post('/getTotalTipos',MaterialController.getTotalTipos); 
// router.get('/getTipo/:id',MaterialController.getTipo); 
// router.post('/crudTipo',MaterialController.crudTipo);
router.post('/crudIngreso',IngresoController.crudIngreso);
router.post('/getIngresos',IngresoController.getIngresosPaginacion);
router.post('/getTotalIngresos',IngresoController.getTotalIngresos);
router.post('/getTotalIngresos',IngresoController.getTotalIngresos);

module.exports = router;
