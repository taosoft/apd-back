const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Comercios = sequelize.define('comercios',
    {
        idComercio: {
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

module.exports = Comercios;
