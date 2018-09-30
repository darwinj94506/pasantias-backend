'use strict'
var db=require('./../bdd.coneccion');

  function getTotalIngresos(req, res, next) {
    db.any("select count(*)  from ingreso")
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Se obtuvo el total de registros de la tabla ingreso'
          });
      })
      .catch(function (err) {
        console.log(err);
        res.status(400).json(err)
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
        console.log(err);
        res.status(400).json(err)
      });
  }
  
  function getIngresosPaginacion(req, res, next) {
    console.log(req.body);
    var page=req.body.page;
    var itemsPerPage=req.body.itemsPerPage;
    console.log(page);
    console.log(itemsPerPage);
    var page2=page*itemsPerPage;
    console.log(page2);
    
    db.any('SELECT  m.nombre material,m.nombre nombrematerial, t.idtipo,t.nombre nombretipo, u.nombre nombreusuario,u.apellido,i.fecha fechaingreso,i.cantidad, i.descripcion,i.serie, p.nombre proveedor,g.descripcion garantia,g.idgarantia,p.idproveedor,m.idmaterial FROM ingreso i join material m on i.idmaterial = m.idmaterial join tipo t on t.idtipo=m.idmaterial left join garantia g on g.idgarantia=i.idgarantia JOIN usuario u ON u.idusuario = i.idusuario left join proveedor p on p.idproveedor=g.idproveedor ORDER BY fechaingreso DESC LIMIT '+itemsPerPage+' OFFSET '+page2)
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'transción exitosa'
          });
      })
      .catch(function (err) {
        console.log(err);
        res.status(400).json(err)
      });
    } 



  
  function crudIngreso(req, res, next) {
    console.log([req.body.idingreso,req.body.idusuario,
      req.body.idgarantia,req.body.idmaterial,req.body.cantidad,req.body.serie,req.body.descripcion,req.body.opcion]);
    var SQL = 'select * from  fun_ime_ingreso($1, $2, $3, $4, $5, $6, $7, $8);';
    db.any(SQL, [req.body.idingreso,req.body.idusuario,
        req.body.idgarantia,req.body.idmaterial,req.body.cantidad,req.body.serie,req.body.descripcion,req.body.opcion])
    .then(function (data) {
      res.status(200)
        .json(data);
    })
    .catch(function (err) {
      console.log(err);
      res.status(400).json(err)
    });
  }

module.exports = {

    getTotalIngresos:getTotalIngresos,
    getIngresosPaginacion:getIngresosPaginacion,
    crudIngreso:crudIngreso
 
};
