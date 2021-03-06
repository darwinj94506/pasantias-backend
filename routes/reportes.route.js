var express = require('express');
var router = express.Router();
var ReportesController=require('./../controllers/reportes.controller');

router.post('/getReporteEgresoDetalle',ReportesController.getEgresoDetalle);
router.post('/getReporteIngreso',ReportesController.getReporteIngreso);
router.post('/getReporteMaterial',ReportesController.getReporteMateriales);

module.exports = router;
