var express = require('express');
var router = express.Router();
var EgresoController=require('./../controllers/egreso.controller');

// router.post('/getTipos',MaterialController.getTiposPaginacion); 
// router.post('/getTotalTipos',MaterialController.getTotalTipos); 
// router.get('/getTipo/:id',MaterialController.getTipo); 
// router.post('/crudTipo',MaterialController.crudTipo);
// router.post('/crudIngreso',IngresoController.crudIngreso);
router.post('/crudEgreso',EgresoController.crudEgreso);
router.post('/crudDetalle',EgresoController.crudDetalle);
router.post('/getEgresosPaginacion',EgresoController.getEgresosPaginacion);
router.post('/getTotalEgresos',EgresoController.getTotalEgresos);
router.post('/validarDetalle',EgresoController.validarDetalle);
router.get('/getStock/:idmaterial',EgresoController.getStock);
router.get('/getDetalles/:idegreso',EgresoController.getDetalles);


module.exports = router;
