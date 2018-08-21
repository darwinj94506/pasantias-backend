var express = require('express');
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
