var express = require('express');
var router = express.Router();
var EgresoController=require('./../controllers/egreso.controller');
var md_auth=require('../middlewares/authenticated');

router.post('/crudEgreso',md_auth.ensureAuth,EgresoController.crudEgreso);
router.post('/crudDetalle',EgresoController.crudDetalle);
router.post('/crudDetalle2',EgresoController.crudDetalle2);
router.post('/getEgresosPaginacion',EgresoController.getEgresosPaginacion);
router.post('/getTotalEgresos',EgresoController.getTotalEgresos);
router.post('/validarDetalle',EgresoController.validarDetalle);
router.get('/getStock/:idmaterial',EgresoController.getStock);
router.get('/getDetalles/:idegreso',EgresoController.getDetalles);
router.get('/getDetalleEgreso/:idegreso',EgresoController.getDetalleEgreso);

module.exports = router;
