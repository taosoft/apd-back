const ReclamoService = require("../services/reclamos.service");

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
        const pagination = req.query.quantity ? req.query.quantity : 0;
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
        const datosReclamo = {
            documento: req.body.documento,
            idSitio: req.body.idSitio,
            idDesperfecto: req.body.idDesperfecto,
            descripcion: req.body.descripcion ? req.body.descripcion : '',
            estado: req.body.estado,
            archivosURL: req.body.archivosURL ? req.body.archivosURL : '',
            IdReclamoUnificado: req.body.IdReclamoUnificado ? req.body.IdReclamoUnificado : 0,
            bitcora: req.body.bitacora ? req.body.bitacora : '',
        }

        const reclamosCreated = await ReclamoService.createReclamo(datosReclamo);

        return res.status(200).json({
            status: 200,
            data: reclamosCreated,
            message: "Successfully Reclamos Created",
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

// Lo hace el municipio, ahora lo hacemos desde la base.
// exports.unificarReclamo = async (req, res, next) => {
    
// };

exports.updateReclamo = async (req, res, next) => {

};
