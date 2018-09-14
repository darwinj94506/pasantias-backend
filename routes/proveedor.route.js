var express = require('express');
var router = express.Router();
var ProveedorController=require('./../controllers/proveedor.controller');
router.post('/crudProveedor', ProveedorController.crudProveedor);
router.post('/getProveedores',ProveedorController.getProveedores);
router.post('/getTotalProveedores',ProveedorController.getTotalProveedores);

module.exports = router;
