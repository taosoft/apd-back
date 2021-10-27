const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');
const Vecinos = require('./vecinos.model');

const Reclamos = sequelize.define('reclamos',
    {
        idReclamo: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrementIdentity: true,
            allowNull: false,
            unique: true,
        },
        documento: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        idSitio: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        idDesperfecto: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
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
            allowNull: true,
        },
        bitacora: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, 
    { freezeTableName: true, timestamps: false }
);

Vecinos.hasMany(Reclamos, { foreignKey: 'documento', targetKey: 'documento' });
Reclamos.belongsTo(Vecinos, { foreignKey: 'documento', targetKey: 'documento' });

module.exports = Reclamos;

// 	constraint fk_reclamos_sitios foreign key (idSitio) references sitios,
// 	constraint fk_reclamos_desperfectos foreign key (idDesperfecto) references desperfectos,
// 	constraint fk_reclamos_reclamos foreign key (IdReclamoUnificado) references reclamos,
// )