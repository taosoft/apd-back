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

exports.getComercios = async (pagination) => {
    try {
        return await ComercioModel.findAll({
            limit: quantity,
            order: ['idComercio', 'documento']
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
