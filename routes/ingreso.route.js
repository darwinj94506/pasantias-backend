var express = require('express');
var router = express.Router();
var IngresoController=require('./../controllers/ingreso.controller');

var md_auth=require('../middlewares/authenticated');
router.post('/crudIngreso',md_auth.ensureAuth,IngresoController.crudIngreso);
router.post('/getIngresos',IngresoController.getIngresosPaginacion);
router.post('/getTotalIngresos',IngresoController.getTotalIngresos);
router.post('/getTotalIngresos',IngresoController.getTotalIngresos);

module.exports = router;
