const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const moment = require('moment');
require('dotenv').config();
require('moment/locale/es');

// Verificacion
console.log("Verificación de tiempo, locale: ", moment.locale());

// Database connection
const mysql_connection = require('./database');

// Endpoints
const usersRouter = require('./routes/users');
const reclamosRouter = require('./routes/reclamos');
const denunciasRouter = require('./routes/denuncias');
const serviciosRouter = require('./routes/servicios');
const comerciosRouter = require('./routes/comercios');
const sitiosRouter = require('./routes/sitios');
const movimientoReclamoRouter = require('./routes/movimientoReclamo');
const movimientoDenunciaRouter = require('./routes/movimientoDenuncia');
const rubrosDenunciaRouter = require('./routes/rubros');
const desperfectosDenunciaRouter = require('./routes/desperfectos');

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
app.use('/comercios', comerciosRouter);
app.use('/sitios', sitiosRouter);
app.use('/movimientoReclamos', movimientoReclamoRouter);
app.use('/movimientoDenuncias', movimientoDenunciaRouter);
app.use('/rubros', rubrosDenunciaRouter);
app.use('/desperfectos', desperfectosDenunciaRouter);

// Test connection
mysql_connection.authenticate()
    .then(console.log('Connected'))
    .catch(console.log);

module.exports = app;
