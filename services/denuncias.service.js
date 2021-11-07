const DenunciaModel = require('../models/denuncias.model');

// Saving the context of this module inside the _the variable
_this = this;

exports.getDenuncia = async (denunciaId) => {
    try {
        return await DenunciaModel.findByPk(denunciaId);
    } catch (error) {
        console.log(error)
        throw Error(`Error al buscar la denuncia #${denunciaId} | `, error);
    }
};

exports.getDenuncias = async (pagination, doc) => {
    try {
        return await DenunciaModel.findAll({
            where: { documento: doc },
            limit: pagination,
            order: ['idDenuncia', 'documento']
        });
    } catch (error) {
        console.log(error)
        throw Error(`Error al buscar todas las Denuncias del usuario ${doc} | `, error);
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
