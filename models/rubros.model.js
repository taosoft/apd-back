const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const Rubros = sequelize.define('rubros',
    {

    }, 
    { freezeTableName: true, timestamps: false }
);

module.exports = Rubros;

// create table rubros(
// 	idRubro int not null identity,
// 	descripcion varchar(200) not null,
// 	constraint pk_rubros primary key (idRubro),
// )