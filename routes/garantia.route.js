var express = require('express');
var router = express.Router();
var GarantiaController=require('./../controllers/garantia.controller');

// router.post('/crudIngreso',IngresoController.crudIngreso);
router.get('/getGarantiasSelect/:idproveedor',GarantiaController.getGarantiaSelect);
// router.get('/getTipo/:id', db.getTipo); 
// router.post('/getTotalIngresos',IngresoController.getTotalIngresos);
// router.post('/getTotalIngresos',IngresoController.getTotalIngresos);

module.exports = router;
