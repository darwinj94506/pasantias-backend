var express = require('express');
var router = express.Router();
var MaterialController=require('./../controllers/material.controller');

// router.post('/getTipos',MaterialController.getTiposPaginacion); 
// router.post('/getTotalTipos',MaterialController.getTotalTipos); 
// router.get('/getTipo/:id',MaterialController.getTipo); 
// router.post('/crudTipo',MaterialController.crudTipo);
router.post('/crudMaterial',MaterialController.crudMaterial);
router.post('/getMateriales',MaterialController.getMateriales);
router.post('/getTotalMateriales',MaterialController.getTotalMateriales);
router.post('/getMaterialesSelect',MaterialController.getMaterialesSelect);
router.post('/getListaTipos', MaterialController.getListaTipos);

module.exports = router;
