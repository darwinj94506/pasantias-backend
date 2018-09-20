var express = require('express');
var router = express.Router();
var EgresoController=require('./../controllers/egreso.controller');

router.post('/crudEgreso',EgresoController.crudEgreso);
router.post('/crudDetalle',EgresoController.crudDetalle);
router.post('/crudDetalle2',EgresoController.crudDetalle2);

router.post('/getEgresosPaginacion',EgresoController.getEgresosPaginacion);
router.post('/getTotalEgresos',EgresoController.getTotalEgresos);
router.post('/validarDetalle',EgresoController.validarDetalle);
router.get('/getStock/:idmaterial',EgresoController.getStock);
router.get('/getDetalles/:idegreso',EgresoController.getDetalles);
router.get('/getDetalleEgreso/:idegreso',EgresoController.getDetalleEgreso);

module.exports = router;
