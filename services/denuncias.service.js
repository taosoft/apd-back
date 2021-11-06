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

exports.getDenuncias = async (pagination, doc) => {
    try {
        return await DenunciaModel.findAll({
            where: { documento: doc},
            limit: pagination,
            order: ['idDenuncias', 'documento']
        });
    } catch (error) {
        throw Error("Error while searching Denuncias | ", error);
    }
};

exports.createDenuncia = async (newDenuncia) => {
    try {
        return await DenunciaModel.create(newDenuncia);
    } catch (error) {
        throw Error("Error while Creating a Denuncia | ", error);
    }
};

exports.updateDenuncia = async (denunciaId, estadoDenuncia) => {
    try {        
        return await DenunciaModel.update(
            { estado: estadoDenuncia },
            { where: { idDenuncia: denunciaId } }
        )
    } catch (error) {
        throw Error("Error while updating Denuncia | ", error);
    }
};
