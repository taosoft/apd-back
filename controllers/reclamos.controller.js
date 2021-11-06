const ReclamoService = require("../services/reclamos.service");
const MovimientoReclamosService = require("../services/movimientoReclamo.service");
const moment = require("moment");

// Saving the context of this module inside the _the variable
_this = this;

exports.getReclamo = async (req, res, next) => {
    try {
        const reclamo = await ReclamoService.getReclamo(req.params.id);
        return res.status(200).json({
            status: 200,
            data: reclamo,
            message: "Successfully Reclamo Received",
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.getReclamos = async (req, res, next) => {
    try {
        const pagination = req.query.quantity ? parseInt(req.query.quantity) : 10;
        const reclamos = await ReclamoService.getReclamos(pagination);

        return res.status(200).json({
            status: 200,
            data: reclamos,
            message: "Successfully Reclamos Received",
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.createReclamo = async (req, res, next) => {
    try {
        if(!await ReclamoService.existeVecino(req.body.documento)) {
            throw new Error(`El vecino con documento ${req.body.documento} no existe`);
        }

        const datosReclamo = {
            documento: req.body.documento,
            idSitio: +req.body.idSitio,
            idDesperfecto: +req.body.idDesperfecto,
            descripcion: req.body.descripcion ? req.body.descripcion : '',
            estado: "Iniciado",
            archivosURL: req.body.archivosURL ? req.body.archivosURL : '',
            bitacora: `Reclamo creado el ${moment().locale('es').format('LLL')} hs`,
        }

        const reclamosCreated = await ReclamoService.createReclamo(datosReclamo);

        const datosMovimientoReclamo = {
            idReclamo: reclamosCreated.idReclamo,
            responsable: "Municipio",
            causa: `Reclamo creado el ${moment().locale('es').format('LLL')} hs`,
        }

        const movimientoReclamo = await MovimientoReclamosService.createMovimientoReclamo(datosMovimientoReclamo);

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

        const reclamoUpdated = await ReclamoService.updateReclamo(parseInt(req.params.id), datosReclamo);

        const datosMovimientoReclamo = {
            idReclamo: parseInt(req.params.id),
            responsable: "Municipio",
            causa: `El reclamo #${reclamoId} cambió su estado a: ${datosReclamo.estado} a las ${moment().locale('es').format('LLL')} hs`,
        }

        const movimientoReclamo = await MovimientoReclamosService.createMovimientoReclamo(datosMovimientoReclamo);

        return res.status(200).json({
            status: 200,
            data: reclamoUpdated,
            message: "Successfully Reclamo Updated",
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};
