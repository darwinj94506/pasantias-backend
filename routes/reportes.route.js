var express = require('express');
var router = express.Router();
var ReportesController=require('./../controllers/reportes.controller');


// router.post('/getListaProveedores',GarantiaController.getListaProveedores);
router.post('/getReporteEgresoDetalle',ReportesController.getEgresoDetalle);
router.post('/getReporteIngreso',ReportesController.getReporteIngreso);


module.exports = router;
