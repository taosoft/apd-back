const ComercioModel = require("../models/comercios.model");

// Saving the context of this module inside the _the variable
_this = this;

exports.getComercio = async (comercioId) => {
    try {
        return await ComercioModel.findByPk(comercioId);
    } catch (error) {
        throw Error("Error while searching Comercio | ", error);
    }
};

exports.getComercios = async () => {
    try {
        return await ComercioModel.findAll({
            where: { aprobado: 1 },
            order: [
                ['idComercio', 'ASC']
            ]
        });
    } catch (error) {
        throw Error("Error while searching Comercios | ", error);
    }
};

exports.createComercio = async (newComercio) => {
    try {
        return await ComercioModel.create(newComercio);
    } catch (error) {
        throw Error("Error while Creating a Comercio | ", error);
    }
};

exports.existeComercio = async (nombreDelComercio) => {
    try {
        return await ComercioModel.count({ where: { nombre: nombreDelComercio } });
        
    } catch (error) {
        throw Error(`Error al buscar si el comercio ${nombreDelComercio} ya existe | `, error)
    }
};

exports.updateComercio = async ({comercioId, estadoAprobado}) => {
    try {
        const comercio = await ComercioModel.findOne({
            where: { idComercio: comercioId }
        })

        comercio.aprobado = estadoAprobado;

        return await comercio.save();
        
    } catch (error) {
        throw Error(`Error actualizar el servicio ${comercioId} | `, error)
    }
};
