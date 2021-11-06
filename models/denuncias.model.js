const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');
const Sitios = require('./sitios.model');

const Denuncias = sequelize.define('denuncias',
    {
        idDenuncia: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        documento: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        idSitio: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        estado: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        aceptaResponsabilidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        fechaDenuncia: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false,
        },
        fechaHecho: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        archivosURL: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }, 
    { freezeTableName: true, timestamps: false }
);

Denuncias.belongsTo(Sitios, { foreignKey: 'idSitio', targetKey: 'idSitio' });

module.exports = Denuncias;
