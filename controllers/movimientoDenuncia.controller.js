const MovimientoDenunciaService = require("../services/movimientoDenuncia.service");
const moment = require("moment");

// Saving the context of this module inside the _the variable
_this = this;

exports.getMovimientosDenuncias = async (req, res, next) => {
    try {
        const movimientosDenuncias = await MovimientoDenunciaService.getMovimientosDenuncias(parseInt(req.params.id));

        return res.status(200).json({
            status: 200,
            data: movimientosDenuncias,
            message: "MovimientoDenuncia exitosamente recibidos",
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.createMovimientoDenuncia = async (req, res, next) => {
    try {
        const datosMovimientoDenuncia = {
            idDenuncia: req.params.id,
            responsable: req.body.responsable,
            causa: req.body.causa,
            fecha: moment().locale('es').format('LLL')
        }
        console.log(datosMovimientoDenuncia)
        const movimientoDenunciaCreated = await MovimientoDenunciaService.createMovimientoDenuncia(datosMovimientoDenuncia);

        return res.status(200).json({
            status: 200,
            data: movimientoDenunciaCreated,
            message: "MovimientoDenuncia creado exitosamente",
        });
    } catch (e) {
        console.log(e)
        return res.status(400).json({ status: 400, message: e.message });
    }
};
