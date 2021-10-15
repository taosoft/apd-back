const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const usersRouter = require('./routes/users');
const reclamosRouter = require('./routes/reclamos');
const denunciasRouter = require('./routes/denuncias');
const serviciosRouter = require('./routes/servicios');
const comerciosRouter = require('./routes/comercios');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', usersRouter);
app.use('/reclamos', reclamosRouter);
app.use('/denuncias', denunciasRouter);
app.use('/servicios', serviciosRouter);
app.use('/comercios', comerciosRouter);

module.exports = app;
