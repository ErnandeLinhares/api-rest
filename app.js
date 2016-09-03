'use strict';

//conexao com BD 
//require('./configs/db.js');

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const routes = require('./routes/index');
const users = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.disable("x-powered-by");
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.all('/api/*', [require('./middlewares/validateRequest')]);
app.use('/', routes);
app.use('/api/test', routes);
app.use('/users', users);


// 404 - Endpoint nao encontrado
app.use(function(req, res, next) {
    res.status(404).json({"message": "Endpoint não encontrado :/"});
});

// Error handlers
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({"mensagem": err.message});
  console.log("Print stacktrace", err);
});

module.exports = app;