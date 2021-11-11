const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Comercios = sequelize.define('comercios',
    {
        idComercio: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        horario: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        archivosURL: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, 
    { freezeTableName: true, timestamps: false }
);

module.exports = Comercios;
