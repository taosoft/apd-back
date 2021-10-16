const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const Denuncias = sequelize.define('denuncias',
    {

    }, 
    { freezeTableName: true, timestamps: false }
);

module.exports = Denuncias;

// create table denuncias(
// 	idDenuncias int not null identity,
// 	documento varchar(20) not null,
// 	idSitio int null,
// 	descripcion varchar(2000) null,
// 	estado varchar(150),
// 	aceptaResponsabilidad int not null,
// 	fechaDenuncia datetime default GETDATE(),
// 	fechaHecho datetime null,
// 	archivosURL varchar(200) null,
// 	constraint pk_denuncias primary key (idDenuncias),
// 	constraint fk_denuncias_vecinos foreign key (documento) references vecinos,
// 	constraint fk_denuncias_sitios foreign key (idSitio) references sitios
// )