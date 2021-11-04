const DenunciaService = require("../services/reclamos.service");
const UserService = require('../services/users.service');
const moment = require('moment');

// Saving the context of this module inside the _the variable
_this = this;

exports.getDenuncia = async (req, res, next) => {
    try {
        const reclamo = await DenunciaService.getDenuncia(req.params.id);
        return res.status(200).json({
            status: 200,
            data: reclamo,
            message: "Successfully Denuncia Received",
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.getDenuncias = async (req, res, next) => {
    try {
        const pagination = req.query.quantity ? parseInt(req.query.quantity) : 10;
        const denuncias = await DenunciaService.getDenuncias(pagination);

        return res.status(200).json({
            status: 200,
            data: denuncias,
            message: "Successfully Denuncias Received",
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.createDenuncia = async (req, res, next) => {
    try {
        if(!await UserService.existeUser(req.body.documento)) {
            throw new Error(`El usuario con documento ${req.body.documento} no existe`);
        }

        const datosDenuncia = {
            documento: req.body.documento,
            idSitio: +req.body.idSitio,
            idDesperfecto: +req.body.idDesperfecto,
            descripcion: req.body.descripcion ? req.body.descripcion : '',
            estado: "Iniciado",
            archivosURL: req.body.archivosURL ? req.body.archivosURL : '',
            bitacora: `Denuncia creada el ${moment().locale('es').format('LLL')} hs`,
        }

        const denunciaCreated = await DenunciaService.createDenucnia(datosDenuncia);

        return res.status(200).json({
            status: 200,
            data: denunciaCreated,
            message: "Successfully Denuncia Created",
        });
    } catch (e) {
        console.log(e)
        return res.status(400).json({ status: 400, message: e.message });
    }
};
