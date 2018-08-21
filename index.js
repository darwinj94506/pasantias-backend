'use strict'
var express = require('express');
var app=require('./app');
//

var port=process.env.PORT || 3789;//

var router = express.Router();

var pg = require('pg');
var conString = "postgres://postgres:darwin123@localhost:5432/inventariodb";
var tipos="SELECT * FROM usuario";
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/data', function (req, res) {
  var client = new pg.Client(conString);

  client.connect().then(()=>{
    console.log("coneccion exitosa")})
    .catch(()=>{console.log("error en la coneccion a la bdd")});

  client.query(tipos, [], (err, result) => {
    res.json(result.rows);
    res.end();
    client.end()
  })
});

module.exports = router;


//-----------------------------
'use strict'

var mongoose=require('mongoose');
var app=require('./app');
var port=process.env.PORT || 3789;

mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/zoo',{useMongoClient:true})
        .then(()=>{
            console.log("La conexion a la bdd zoo se ha realizado correctamente...");
            app.listen(port,()=>{
              console.log('el servidor local con node y express esta corriendo');
            })
        }).catch(err=> console.log(err));
