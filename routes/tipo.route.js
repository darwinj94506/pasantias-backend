var express = require('express');
var router = express.Router();
var TipoController=require('./../controllers/tipo.controller');

router.post('/getTipos', TipoController.getTiposPaginacion); 
router.post('/getTotalTipos', TipoController.getTotalTipos); 
router.get('/getTipo/:id', TipoController.getTipo); 
router.post('/crudTipo', TipoController.crudTipo);
router.post('/crudMaterial', TipoController.crudMaterial);
router.post('/getMateriales', TipoController.getMateriales);
router.post('/getTotalMateriales', TipoController.getTotalMateriales);


module.exports = router;
