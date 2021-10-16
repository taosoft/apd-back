const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const MovimientoDenuncia = sequelize.define('movimientoDenuncia',
    {

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