'use strict'
var db=require('./../bdd.coneccion');

function getMaterialesSelect(req, res, next) {
  console.log(db);
  db.any('select * from material')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL tipos'
        });
    })
    .catch(function (err) {
      return next(err);
    });
  }
 
function crudMaterial(req,res,next){
  var SQL = 'select * from  fun_ime_material($1, $2, $3,$4);';
  db.any(SQL,[req.body.idmaterial,req.body.idtipo,req.body.nombre, req.body.opcion])
  .then(function(data){
    res.status(200)
    .json(data);
  })
  .catch(function(err){
    return next(err);
  });
}

function getMateriales(req, res, next){
var page=req.body.page;
var itemsPerPage=req.body.itemsPerPage;
var page2=page*itemsPerPage;
db.any('SELECT m.idmaterial, m.idtipo, m.nombre, m.stock, m.fecha, m.estado, t.nombre nombretipo, t.fecha fechatipo, t.estado estadotipo FROM material m join tipo t on m.idtipo = t.idtipo where m.estado=1  LIMIT '+itemsPerPage+' OFFSET '+page2)
.then(function (data) {
  res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'Retrieved ALL tipos'
    });
})
.catch(function (err) {
  return next(err);
});
}

function getTotalMateriales(req, res, next) {
  db.any("select count(*)  from material where estado=1")
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Se obtuvo el total de registros de la tabla tipo'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function getListaTipos(req,res,next){
  db.any('select * from tipo')
  .then(function(data){
    res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Se obtuvo los nombre de los tipos de materiales'
        });
  })
  .catch(function (err) {
    return next(err);
  });
}



module.exports = {
  crudMaterial: crudMaterial,
  getMateriales:getMateriales,
  getListaTipos:getListaTipos,
  getTotalMateriales: getTotalMateriales,
  getMaterialesSelect:getMaterialesSelect,

};
