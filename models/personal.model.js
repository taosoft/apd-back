const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const Personal = sequelize.define('personal',
    {
        legajo: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sector: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cartegoria: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fechaIngreso: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW,
        },
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