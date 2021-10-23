const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');
const Vecinos = require('./vecinos.model');

const Denuncias = sequelize.define('denuncias',
    {
        idDenuncias: {
            type: DataTypes.INTEGER,
            primaryKey: true,
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

Denuncias.belongsTo(Vecinos, { foreignKey: 'documento', targetKey: 'documento' });

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