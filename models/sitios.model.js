const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const Sitios = sequelize.define('sitios',
    {
        
    }, 
    { freezeTableName: true, timestamps: false }
);

module.exports = Sitios;

// create table sitios(
// 	idSitio int not null identity,
// 	latitud decimal(9,5),
// 	longitud decimal(9,5),
// 	calle varchar(150) null,
// 	numero int,
// 	entreCalleA varchar(150) null,
// 	entreCalleB varchar(150) null,
// 	descripcion varchar(300),
// 	aCargoDe varchar(200),
// 	apertura time,
// 	cierre time,
// 	comentarios text,
// 	constraint pk_sitios primary key (idSitio)
// )