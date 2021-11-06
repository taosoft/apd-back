const MovimientoReclamoModel = require('../models/movimientoReclamo.model');

// Saving the context of this module inside the _the variable
_this = this;

exports.getMovimientosReclamos = async (reclamoId) => {
    try {
        return  await MovimientoReclamoModel.findAll({
            where: { idReclamo: reclamoId },
            order: ['idMovimiento', 'idReclamo']
        });

    } catch (error) {
        throw Error(`Error al buscar todos los movimientos de reclamos | `, error);
    }
};

exports.createMovimientoReclamo = async (newMovimientoReclamo) => {
    try {
        return await MovimientoReclamoModel.create(newServicio);
    } catch (error) {
        throw Error(`Error al crear el movimiento de reclamo #${newMovimientoReclamo.idReclamo} | `, error);
    }
};
