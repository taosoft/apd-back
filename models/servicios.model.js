const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Servicios = sequelize.define('servicios',
    {
        idServicio: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, 
    { freezeTableName: true, timestamps: false }
);

module.exports = Servicios;
