const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const Personal = sequelize.define('personal',
    {

    }, 
    { freezeTableName: true, timestamps: false }
);

module.exports = Personal;

// create table personal(
// 	legajo int not null identity,
// 	nombre varchar(150) not null,
// 	apellido varchar(150) not null,
// 	password varchar(40) not null,
// 	sector varchar(200) not null,
// 	cartegoria int,  --Los inspectores son categoria 8
// 	fechaIngreso datetime,
// 	constraint pk_personal primary key (legajo)
// )