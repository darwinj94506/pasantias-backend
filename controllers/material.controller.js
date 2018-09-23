'use strict'
var db=require('./../bdd.coneccion');

function getMaterialesSelect(req, res, next) {
  console.log(req.body.idtipo);
  db.any('select * from material where idtipo=$1 AND estado=1 ',req.body.idtipo)
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
  function getMaterialesSelect2(req, res, next) {
    console.log(req.body.idtipo);
    db.any('select * from material where estado=1')
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
  var SQL = 'select * from  fun_ime_material($1, $2, $3,$4,$5);';
  console.log([req.body.idmaterial,req.body.idtipo,req.body.nombre, req.body.opcion,req.body.stockminimo]);
  db.any(SQL,[req.body.idmaterial, req.body.idtipo, req.body.nombre, req.body.opcion,req.body.stockminimo])
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
db.any('SELECT * FROM material_stock m LIMIT '+itemsPerPage+' OFFSET '+page2)
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
// function getListaTipos(req,res,next){
//   db.any('select * from tipo where estado=1')
//   .then(function(data){
//     res.status(200)
//         .json({
//           status: 'success',
//           data: data,
//           message: 'Se obtuvo los nombre de los tipos de materiales'
//         });
//   })
//   .catch(function (err) {
//     return next(err);
//   });
// }



module.exports = {
  crudMaterial: crudMaterial,
  getMateriales:getMateriales,
  // getListaTipos:getListaTipos,
  getTotalMateriales: getTotalMateriales,
  getMaterialesSelect:getMaterialesSelect,
  getMaterialesSelect2:getMaterialesSelect2,


};
