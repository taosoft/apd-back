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
        const datosReclamo = {
            idReclamo: req.body.idReclamo,
            responsable: req.body.responsable,
            causa: req.body,causa,
        }

        const reclamosCreated = await MovimientoReclamoService.createMovimientoReclamo(datosReclamo);

        return res.status(200).json({
            status: 200,
            data: reclamosCreated,
            message: "Successfully Reclamos Created",
        });
    } catch (e) {
        console.log(e)
        return res.status(400).json({ status: 400, message: e.message });
    }
};

// Lo hace el municipio, ahora lo hacemos desde la base.
// exports.unificarReclamo = async (req, res, next) => {
    
// };

exports.updateReclamo = async (req, res, next) => {
    try {
        if (req.body.estado.indexOf(";") > -1) {
            throw new SyntaxError("No puede incluir el caracter ; en estado");
        }
        const datosReclamo = {
            estado: req.body.estado,
        }

        const reclamoUpdated = await MovimientoReclamoService.updateReclamo(parseInt(req.params.id), datosReclamo);

        return res.status(200).json({
            status: 200,
            data: reclamoUpdated,
            message: "Successfully Reclamo Updated",
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};
