'use strict'
var db=require('./../bdd.coneccion');

 
function crudGarantia(req,res,next){
  var SQL = 'select * from  fun_ime_garantia($1, $2, $3,$4);';
  db.any(SQL,[req.body.idgarantia,req.body.idproveedor,req.body.descripcion, req.body.opcion])
  .then(function(data){
    res.status(200)
    .json(data);
  })
  .catch(function (err) {
    console.log(err);
    res.status(400).json(err)
  });
}


function getGarantias(req, res, next){
var page=req.body.page;
var itemsPerPage=req.body.itemsPerPage;
var page2=page*itemsPerPage;
db.any('SELECT g.idgarantia, g.idproveedor, g.descripcion, g.estado, p.nombre nombreproveedor, p.estado estadoproveedor FROM garantia g join proveedor p on g.idproveedor = p.idproveedor where g.estado=1  LIMIT '+itemsPerPage+' OFFSET '+page2)
.then(function (data) {
  res.status(400)
    .json({
      status: 'success',
      data: data,
      message: 'Retrieved ALL tipos'
    });
})
.catch(function (err) {
  console.log(err);
  res.status(400).json(err)
});
}

function getTotalGarantias(req, res, next) {
  db.any("select count(*)  from garantia where estado=1")
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Se obtuvo el total de garantias'
        });
    })
    .catch(function (err) {
      console.log(err);
      res.status(400).json(err)
    });
}
function getListaProveedores(req,res,next){
  db.any('select * from proveedor where estado=1')
  .then(function(data){
    res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Se obtuvo los nombre de los proveedores'
        });
  })
  .catch(function (err) {
    console.log(err);
    res.status(400).json(err)
  });
}

function getGarantiaSelect(req, res, next){
  console.log(req.params.idproveedor);
  let idproveedor=req.params.idproveedor;
  db.any('select * from garantia where idproveedor='+idproveedor)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'las garantias'
        });
    })
    .catch(function (err) {
      console.log(err);
      res.status(400).json(err)
    });
}



module.exports = {
  getGarantiaSelect:getGarantiaSelect,
  crudGarantia: crudGarantia,
  getGarantias:getGarantias,
  getListaProveedores:getListaProveedores,
  getTotalGarantias: getTotalGarantias,

};
