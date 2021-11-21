const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Rubros = require('../models/rubros.model');

const Servicios = sequelize.define('servicios',
    {
        idServicio: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        idRubro: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        nombreServicio: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nombrePersona: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        direccion: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        telefono: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
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
        aprobado: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 0,
        },
    }, 
    { freezeTableName: true, timestamps: false }
);

Servicios.belongsTo(Rubros, { foreignKey: 'idRubro', targetKey: 'idRubro' });
Rubros.hasMany(Servicios, { foreignKey: 'idRubro', targetKey: 'idRubro' });

module.exports = Servicios;
