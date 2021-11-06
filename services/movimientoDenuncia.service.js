const MovimientosDenunciaModel = require('../models/movimientosDenuncia.model');

// Saving the context of this module inside the _the variable
_this = this;

exports.getMovimientosDenuncias = async (denunciaId) => {
    try {
        return  await MovimientosDenunciaModel.findAll({
            where: { idDenuncia: denunciaId },
            order: ['idMovimiento', 'idDenuncia']
        });

    } catch (error) {
        throw Error(`Error al buscar todos los movimientos de denuncias | `, error);
    }
};

exports.createMovimientoDenuncia = async (newMovimientoDenuncia) => {
    try {
        return await MovimientosDenunciaModel.create(newMovimientoDenuncia);
    } catch (error) {
        throw Error(`Error al crear el movimiento de denuncia #${newMovimientoDenuncia.idDenuncia} | `, error);
    }
};
