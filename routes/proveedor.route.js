var express = require('express');
var router = express.Router();
var ProveedorController=require('./../controllers/proveedor.controller');

// router.post('/crudIngreso',IngresoController.crudIngreso);
router.post('/getProveedoresSelect',ProveedorController.getProveedoresSelect);
// router.post('/getTotalIngresos',IngresoController.getTotalIngresos);
// router.post('/getTotalIngresos',IngresoController.getTotalIngresos);

module.exports = router;
