'use strict'
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser=require('body-parser');
var app = express();
//cargar rutas declaracion 
// var indexRouter=require('./index');
var tipoRouter=require('./routes/tipo.route');
var materialRouter=require('./routes/material.route');
var usuarioRouter=require('./routes/usuario.route');
var ingresoRouter=require('./routes/ingreso.route');
var egresoRouter=require('./routes/egreso.route');
var proveedorRouter=require('./routes/proveedor.route');
var garantiaRouter=require('./routes/garantia.route');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//-----
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,DELETE');
  res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');
  next();
});
//-----Rutas creadas -------- 
// app.use('/', indexRouter);
app.use('/api',tipoRouter);
app.use('/api',materialRouter);
app.use('/api',usuarioRouter);
app.use('/api',ingresoRouter);
app.use('/api',egresoRouter);
app.use('/api',proveedorRouter);
app.use('/api',garantiaRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
//rutas base
module.exports = app;
