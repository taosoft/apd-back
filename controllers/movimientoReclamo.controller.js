const MovimientoReclamoService = require("../services/movimientoReclamo.service");
const moment = require("moment");

// Saving the context of this module inside the _the variable
_this = this;

exports.getMovimientosReclamos = async (req, res, next) => {
    try {
        const movimientosReclamos = await MovimientoReclamoService.getMovimientosReclamos(parseInt(req.params.id));

        return res.status(200).json({
            status: 200,
            data: movimientosReclamos,
            message: "MovimientoReclamos exitosamente recibidos",
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.createMovimientoReclamo = async (req, res, next) => {
    try {
        const datosMovimientoReclamo = {
            idReclamo: req.params.id,
            responsable: req.body.responsable,
            causa: req.body.causa,
        }

        const movimientoReclamosCreated = await MovimientoReclamoService.createMovimientoReclamo(datosMovimientoReclamo);

        return res.status(200).json({
            status: 200,
            data: movimientoReclamosCreated,
            message: "Successfully Reclamos Created",
        });
    } catch (e) {
        console.log(e)
        return res.status(400).json({ status: 400, message: e.message });
    }
};

