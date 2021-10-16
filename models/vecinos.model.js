const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Vecinos = sequelize.define('vecinos',
    {
        documento: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        direccion: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        codigoBarrio: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    }, 
    { freezeTableName: true, timestamps: false }
);

module.exports = Vecinos;

// create table vecinos(
// 	documento varchar(20) not null,
// 	nombre varchar(150) not null,
// 	apellido varchar(150) not null,
// 	direccion varchar(250) null, 
// 	codigoBarrio int null
// 	constraint pk_vecinos primary key (documento),
// 	constraint fk_vecinos_barrios foreign key (codigoBarrio) references barrios
// )