const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

// Database connection
const mysql_connection = require('./database');

// Endpoints
const usersRouter = require('./routes/users');
const reclamosRouter = require('./routes/reclamos');
const denunciasRouter = require('./routes/denuncias');
const serviciosRouter = require('./routes/servicios');
// const comerciosRouter = require('./routes/comercios');
const sitiosRouter = require('./routes/sitios');

const app = express();

const corsOptions = {
    origin: `http://localhost:${process.env.PORT}`,
};
app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', usersRouter);
app.use('/reclamos', reclamosRouter);
app.use('/denuncias', denunciasRouter);
app.use('/servicios', serviciosRouter);
// app.use('/comercios', comerciosRouter);
app.use('/sitios', sitiosRouter);

// Test connection
mysql_connection.authenticate()
    .then(console.log('Connected'))
    .catch(console.log);

module.exports = app;
