var express = require('express');
var router = express.Router();

var db = require('./coneccion');


// router.get('/api/getTipos', db.getTipos);
//np: numero de pagina , pa:pagina actual 
router.post('/api/getTipos', db.getTiposPaginacion); 

router.post('/api/getTotalTipos', db.getTotalTipos); 
router.get('/api/getTipo/:id', db.getTipo); 


// router.get('/api/puppies/:id', db.getSinglePuppy);git
router.post('/api/crudTipo', db.crudTipo);
// router.put('/api/puppies/:id', db.updatePuppy);
// router.delete('/api/puppies/:id', db.removePuppy);


module.exports = router;