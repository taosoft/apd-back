const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Desperfectos = sequelize.define('desperfectos',
    {
        idDesperfecto: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        idRubro: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, 
    { freezeTableName: true, timestamps: false }
);

module.exports = Desperfectos;

// create table desperfectos(
// 	idDesperfecto int not null identity,
// 	descripcion varchar(200) not null,
// 	idRubro int null,
// 	constraint pk_desperfectos primary key (idDesperfecto),
// 	constraint fk_desperfecto_rubro foreign key (idRubro) references rubros
// )