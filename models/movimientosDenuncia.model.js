const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const MovimientoDenuncia = sequelize.define('movimientoDenuncia',
    {
        idMovimiento: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        idDenuncia: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
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

module.exports = MovimientoDenuncia;

// create table movimientosDenuncia(
// 	idMovimiento int not null identity,
// 	idDenuncia int not null,
// 	responsable varchar(150) not null,
// 	causa varchar(4000) not null,
// 	fecha datetime default GETDATE(),
// 	constraint pk_movimientosDenuncia primary key (idMovimiento),
// 	constraint fk_movimientosDenuncia_denuncia foreign key (idDenuncia) references denuncias	
// )