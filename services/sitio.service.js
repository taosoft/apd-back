const SitioModel = require('../models/sitios.model');

// Saving the context of this module inside the _the variable
_this = this;

exports.getSitio = async (sitioId) => {
    try {
        return await SitioModel.findByPk(sitioId);
    } catch (error) {
        throw Error("Error while searching Denuncia | ", error);
    }
};

exports.getSitios = async (quantity) => {
    try {
        return await SitioModel.findAll({
            limit: quantity,
            order: [
                ['idSitio', 'ASC']
            ]
        });
    } catch (error) {
        throw Error("Error while searching Reclamos | ", error);
    }
};
