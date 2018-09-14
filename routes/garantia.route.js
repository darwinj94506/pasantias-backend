var express = require('express');
var router = express.Router();
var GarantiaController=require('./../controllers/garantia.controller');

router.post('/crudGarantia',GarantiaController.crudGarantia);
router.post('/getGarantias',GarantiaController.getGarantias);
router.post('/getListaProveedores',GarantiaController.getListaProveedores);
router.post('/getTotalGarantias',GarantiaController.getTotalGarantias);
router.get('/getGarantiasSelect/:idproveedor',GarantiaController.getGarantiaSelect);


module.exports = router;
