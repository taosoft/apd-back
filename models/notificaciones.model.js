const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Notificacion = sequelize.define('notificaciones',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        documento: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        idGestion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        visto: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        }
    }, 
    { freezeTableName: true, timestamps: false }
);

module.exports = Notificacion;
