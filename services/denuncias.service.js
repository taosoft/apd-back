const DenunciaModel = require('../models/denuncias.model');

// Saving the context of this module inside the _the variable
_this = this;

exports.getDenuncia = async (denunciaId) => {
    try {
        return await DenunciaModel.findByPk(denunciaId);
    } catch (error) {
        throw Error("Error while searching Denuncia | ", error);
    }
};

exports.getDenuncias = async (quantity) => {
    try {
        return await DenunciaModel.findAll({
            limit: quantity,
            order: ['idDenuncia', 'documento']
        });
    } catch (error) {
        throw Error("Error while searching Reclamos | ", error);
    }
};

exports.createDenuncia = async (newDenuncia) => {
    try {
        return await DenunciaModel.create(newDenuncia);
    } catch (error) {
        throw Error("Error while Creating a Reclamo | ", error);
    }
};
