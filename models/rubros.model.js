const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Rubros = sequelize.define('rubros',
    {
        idRubro: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, 
    { freezeTableName: true, timestamps: false }
);

module.exports = Rubros;

// create table rubros(
// 	idRubro int not null identity,
// 	descripcion varchar(200) not null,
// 	constraint pk_rubros primary key (idRubro),
// )