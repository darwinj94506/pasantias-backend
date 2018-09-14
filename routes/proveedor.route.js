var express = require('express');
var router = express.Router();
var ProveedorController=require('./../controllers/proveedor.controller');
router.post('/crudProveedor', ProveedorController.crudProveedor);
router.post('/getProveedores',ProveedorController.getProveedores);
router.post('/getTotalProveedores',ProveedorController.getTotalProveedores);
router.post('/getProveedoresSelect',ProveedorController.getProveedoresSelect);


module.exports = router;
