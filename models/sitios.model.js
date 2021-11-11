const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Sitios = sequelize.define('sitios',
    {
        idSitio: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        latitud: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        calle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        numero: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        entreCalleA: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        entreCalleB: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        aCargoDe: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        apertura: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        cierre: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        comentarios: {
            type: DataTypes.STRING,
            allowNull: false,
        },
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