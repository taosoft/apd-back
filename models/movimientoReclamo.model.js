const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const MovimientoReclamo = sequelize.define('movimientosReclamo',
    {
        idMovimiento: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        idReclamo: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        responsable: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        causa: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fecha: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW,
        },
    }, 
    { freezeTableName: true, timestamps: false }
);

module.exports = MovimientoReclamo;

// create table movimientosReclamo(
// 	idMovimiento int not null identity,
// 	idReclamo int not null,
// 	responsable varchar(150) not null,
// 	causa varchar(1000) not null,
// 	fecha datetime default GETDATE(),
// 	constraint pk_movimientosReclamo primary key (idMovimiento),
// 	constraint fk_movimientosReclamo_reclamos foreign key (idReclamo) references reclamos	
// )