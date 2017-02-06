process.env.NODE_ENV = process.env.NODE_ENV === undefined ? 'local' : process.env.NODE_ENV;

//Libraries
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const errorHandler = require('./helpers/errorHelper')

const controllers = require('./controllers');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//TODO: Favicon
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Controllers
app.use(controllers);

//Errors
app.use(errorHandler.handle404);
app.use(errorHandler.handleError);

module.exports = app;
