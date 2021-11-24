const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Users = sequelize.define('users',
    {
        documento: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contraseña: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        inspector: {
            type: DataTypes.INTEGER,
            defaultValue: 0, // No inspector
            allowNull: false,
        },
        idRubro: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    }, 
    { freezeTableName: true, timestamps: false }
);

module.exports = Users;
