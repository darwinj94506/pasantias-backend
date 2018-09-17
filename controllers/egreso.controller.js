'use strict'
var db=require('./../bdd.coneccion');

  function getTotalEgresos(req, res, next) {
    db.any("select count(*)  from egreso")
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'transacción exitosa'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }
  function getStock(req, res, next) {
    console.log(req.params.idmaterial);

    db.any("select stock from material_stock where idmaterial="+req.params.idmaterial)
      .then(function (data) {
        console.log(data);
        res.status(200)
          data:data
      })
      .catch(function (err) {
        return next(err);
      });
  }

  function validarDetalle(req, res, next) {
    console.log("wwww");
    var cuerpo=req.body;
    console.log(JSON.stringify(cuerpo));
    var lista='';
   for (var i in cuerpo){
     lista+='select '+cuerpo[i].idmaterial+'::integer idmaterial, '+cuerpo[i].cantidad+'::integer cantidad';
      if(i==(cuerpo.length-1)){
        lista+=';';
      }else{
        lista+=' union ';
      }   
   }
   console.log(lista);
   db.any('select * from fun_ime_detalle_egreso_stock($1,$2);',[lista,cuerpo.length])
   .then(function (data) {
     res.status(200)
     .json({
      _info_id: data[0]._info_id,
      _info_titulo: data[0]._info_titulo,
      _info_desc: data[0]._info_desc,
      _info_lista: JSON.parse(data[0]._info_lista)
    });
   })
   .catch(function (err) {
     return next(err);
   });
  
  }


  function getTipo(req, res, next){
    console.log(req);
    let id=req.params.id;
    db.any('select * from tipo where idtipo='+id)
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'se optuvo el material'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }

  // db.any('SELECT m.nombre,i.serie,g.descripcion,p.nombre FROM detalle_egreso d'+
  // 'JOIN ingreso i ON i.idingreso = d.idingreso'+ 
  // 'JOIN material m ON m.idmaterial = i.idmaterial'+
  // 'JOIN garantia g ON g.idgarantia= i.idgarantia'+
  // 'JOIN proveedor p ON p.idproveedor=g.idproveedor where d.idegreso=$1',req.params.idegreso)
  
  function getDetalleEgreso(req, res, next) {
    var page=req.body.page;
    console.log(req.params.idegreso);
    db.any('SELECT m.nombre material,i.serie,g.descripcion,p.nombre proveedor, d.cantidad FROM detalle_egreso d JOIN ingreso i ON i.idingreso = d.idingreso JOIN material m ON m.idmaterial = i.idmaterial JOIN garantia g ON g.idgarantia= i.idgarantia JOIN proveedor p ON p.idproveedor=g.idproveedor where d.idegreso=$1',req.params.idegreso)
      .then(function (data) {
        res.status(200)
          .json({
            data: data,
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }

function getEgresosPaginacion(req, res, next) {
  console.log(req.body);
  var page=req.body.page;
  var itemsPerPage=req.body.itemsPerPage;
  console.log(page);
  console.log(itemsPerPage);
  var page2=page*itemsPerPage;
  console.log(page2);
  db.any('select e.idegreso, e.idusuario, u.nombre usuario, e.idsolicitante, s.nombre solicitante, e.memorando, e.fecha, e.observacion, e.estado from egreso e join usuario u on e.idusuario = u.idusuario join usuario s on e.idsolicitante = s.idusuario ORDER BY e.fecha DESC LIMIT '+itemsPerPage+' OFFSET '+page2)
    .then(function (data) {
      res.status(200)
        .json({
          data: data
        });
    })
    .catch(function (err) {
      return next(err);
    });
  }
  function getDetalles(req, res, next){
    console.log('req.params.idegreso');
    console.log(req.params);
      db.any('SELECT material.nombre, material.idmaterial, sum(detalle_egreso.cantidad) FROM detalle_egreso JOIN ingreso ON ingreso.idingreso = detalle_egreso.idingreso JOIN material ON material.idmaterial = ingreso.idmaterial WHERE detalle_egreso.idegreso = $1 group by material.idmaterial, material.nombre',req.params.idegreso)
        .then(function (data) {
          res.status(200)
            .json({
              status: 'success',
              data: data,
              message: 'transción exitosa'
            });
        })
        .catch(function (err) {
          return next(err);
        });
  } 
 
  function crudEgreso(req, res, next) {
    console.log("xxx");
    console.log([req.body.idegreso,req.body.idusuario,req.body.idsolicitante,
      req.body.memorando,req.body.observacion]);
    var SQL = 'select * from  fun_ime_egreso($1, $2, $3, $4, $5, $6);';
    db.any(SQL,[req.body.idegreso,req.body.idusuario,req.body.idsolicitante,
      req.body.memorando,req.body.observacion,req.body.opcion]).then(function (data) {
      res.status(200)
        .json(data);
    })
    .catch(function (err) {
      return next(err);
    });
  }


  function crudDetalle(req, res, next) {
   console.log([req.body.iddetalle,req.body.idegreso,req.body.idingreso,req.body.cantidad,req.body.opcion,req.body.idmaterial]);
    var SQL = 'select * from  fun_ime_detalle_egreso($1, $2, $3, $4, $5,$6);';
    db.any(SQL,[req.body.iddetalle,req.body.idegreso,req.body.idingreso,req.body.cantidad,req.body.opcion,req.body.idmaterial]).then(function (data) {
      res.status(200)
        .json(data);
    })
    .catch(function (err) {
      console.log('error:'+err);
      console.log('idmaterial:'+req.body.idmaterial);
      console.log("ha ocurrido un error");
      return next(err);
    });
  }

module.exports = {
  getDetalleEgreso:getDetalleEgreso,
  getDetalles:getDetalles,
  validarDetalle:validarDetalle,
  getTotalEgresos:getTotalEgresos,
  getEgresosPaginacion:getEgresosPaginacion,
  crudEgreso:crudEgreso,
  crudDetalle:crudDetalle,
  getStock:getStock
 
};
