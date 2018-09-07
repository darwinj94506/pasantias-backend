var express = require('express');
var router = express.Router();
var EgresoController=require('./../controllers/egreso.controller');

// router.post('/getTipos',MaterialController.getTiposPaginacion); 
// router.post('/getTotalTipos',MaterialController.getTotalTipos); 
// router.get('/getTipo/:id',MaterialController.getTipo); 
// router.post('/crudTipo',MaterialController.crudTipo);
// router.post('/crudIngreso',IngresoController.crudIngreso);
router.post('/getegresos',EgresoController.getEgresosPaginacion);
// router.post('/getTotalMateriales',MaterialController.getTotalMateriales);

module.exports = router;
