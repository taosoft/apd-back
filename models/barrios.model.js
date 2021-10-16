const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const Barrios = sequelize.define('barrios',
    {

    }, 
    { freezeTableName: true, timestamps: false }
);

module.exports = Barrios;

// create table barrios(
// 	idBarrio int not null identity,
// 	nombre varchar(150) not null,
// 	constraint pk_barrios primary key (idBarrio),
// )