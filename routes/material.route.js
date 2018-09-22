var express = require('express');
var router = express.Router();
var MaterialController=require('./../controllers/material.controller');

router.post('/crudMaterial',MaterialController.crudMaterial);
router.post('/getMateriales',MaterialController.getMateriales);
router.post('/getTotalMateriales',MaterialController.getTotalMateriales);
router.post('/getMaterialesSelect',MaterialController.getMaterialesSelect);
router.post('/getMaterialesSelect2',MaterialController.getMaterialesSelect2);

router.post('/getListaTipos', MaterialController.getListaTipos);

module.exports = router;
