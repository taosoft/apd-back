const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');
const Sitios = require('./sitios.model');
const Rubros = require('./rubros.model');
const Users = require('./users.model');
const Desperfectos = require('./desperfectos.model');

const Reclamos = sequelize.define('reclamos',
    {
        idReclamo: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        documento: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        idSitio: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idRubro: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idDesperfecto: {
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
        fecha: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false,
        },
        archivosURL: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        IdReclamoUnificado: {
            type: DataTypes.INTEGER,
            defaultValue: null,
            allowNull: true,
        },
        bitacora: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, 
    { freezeTableName: true, timestamps: false }
);

Reclamos.belongsTo(Users, { foreignKey: 'documento', targetKey: 'documento' });
Users.hasMany(Reclamos, { foreignKey: 'documento', targetKey: 'documento' });

Reclamos.belongsTo(Sitios, { foreignKey: 'idSitio', targetKey: 'idSitio' });
Reclamos.belongsTo(Rubros, { foreignKey: 'idRubro', targetKey: 'idRubro' });

Desperfectos.hasMany(Reclamos, { foreignKey: 'idDesperfecto', targetKey: 'idDesperfecto' });
Reclamos.belongsTo(Desperfectos, { foreignKey: 'idDesperfecto', targetKey: 'idDesperfecto' });

module.exports = Reclamos;
