const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Users = sequelize.define('users',
    {
        documento: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
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
        contraseña: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, 
    { freezeTableName: true, timestamps: false }
);

module.exports = Users;

// create table vecinos(
// 	documento varchar(20) not null,
// 	nombre varchar(150) not null,
// 	apellido varchar(150) not null,
// 	direccion varchar(250) null, 
// 	codigoBarrio int null
// 	constraint pk_vecinos primary key (documento),
// 	constraint fk_vecinos_barrios foreign key (codigoBarrio) references barrios
// )