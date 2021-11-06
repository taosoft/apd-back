const DenunciaService = require("../services/denuncias.service");
const UserService = require('../services/users.service');
const MovimientoDenunciasService = require('../services/movimientoDenuncia.service');
const moment = require('moment');

// Saving the context of this module inside the _the variable
_this = this;

exports.getDenuncia = async (req, res, next) => {
    try {
        const denuncia = await DenunciaService.getDenuncia(parseInt(req.params.id));
        return res.status(200).json({
            status: 200,
            data: denuncia,
            message: "Denuncia recibida exitosamente",
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.getDenuncias = async (req, res, next) => {
    try {
        const pagination = req.query.quantity ? parseInt(req.query.quantity) : 10;
        const denuncias = await DenunciaService.getDenuncias(pagination, req.params.documento);

        return res.status(200).json({
            status: 200,
            data: denuncias,
            message: "Denuncias recibida exitosamente",
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
            descripcion: req.body.descripcion ? req.body.descripcion : '',
            estado: "Iniciado",
            aceptaResponsabilidad: req.body.aceptaResponsabilidad ?? 1,
            fechaHecho: req.body.fechaHecho ?? moment().locale('es').format(),
            archivosURL: req.body.archivosURL ? req.body.archivosURL : '',
        }

        const denunciaCreated = await DenunciaService.createDenuncia(datosDenuncia);

        const datosMovimientoDenuncia = {
            idDenuncia: denunciaCreated.idDenuncia,
            responsable: "Municipio",
            causa: denunciaCreated.descripcion,
        }

        const movimientoDenunciaCreada = MovimientoDenunciasService.createMovimientoDenuncia(datosMovimientoDenuncia);

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

exports.updateDenuncia = async (req, res, next) => {
    try {
        const nuevoEstadoDenuncia = {
            estado: req.body.estado,
        }

        const denunciaUpdated = await DenunciaService.updateDenuncia(parseInt(req.params.id), nuevoEstadoDenuncia);

        const datosMovimientoDenuncia = {
            idDenuncia: denunciaUpdated.idDenuncia,
            responsable: "Municipio",
            causa: `La denuncia #${idDenuncia} cambió su estado a: ${denunciaUpdated.estado} a las ${moment().locale('es').format('LLL')} hs`,
        }

        const movimientoDenuncia = await MovimientoDenunciasService.createMovimientoDenuncia(datosMovimientoDenuncia);

        return res.status(200).json({
            status: 200,
            data: denunciaUpdated,
            message: "Successfully Reclamo Updated",
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};
