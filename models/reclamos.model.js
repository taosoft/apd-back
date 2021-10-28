const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');
const Sitios = require('./sitios.model');
const Vecinos = require('./vecinos.model');
const Desperfectos = require('./desperfectos.model');

const Reclamos = sequelize.define('reclamos',
    {
        idReclamo: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrementIdentity: true,
        },
        documento: {
            type: DataTypes.STRING,
            allowNull: false,
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

// TODO: RESOLVER foreign keys
// Vecinos.hasMany(Reclamos, { foreignKey: 'documento', targetKey: 'documento' });
// Reclamos.belongsTo(Vecinos, { foreignKey: 'documento', targetKey: 'documento' });

Reclamos.belongsTo(Sitios, { foreignKey: 'idSitio', targetKey: 'idSitio' });

Desperfectos.hasMany(Reclamos, { foreignKey: 'idDesperfecto', targetKey: 'idDesperfecto' });
Reclamos.belongsTo(Desperfectos, { foreignKey: 'idDesperfecto', targetKey: 'idDesperfecto' });

module.exports = Reclamos;

// 	constraint fk_reclamos_sitios foreign key (idSitio) references sitios,
// 	constraint fk_reclamos_desperfectos foreign key (idDesperfecto) references desperfectos,
// 	constraint fk_reclamos_reclamos foreign key (IdReclamoUnificado) references reclamos,
// )