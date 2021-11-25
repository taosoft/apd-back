const DenunciaService = require("../services/denuncias.service");
const MovimientoDenunciasService = require('../services/movimientoDenuncia.service');
const NotificacionService = require('../services/notificaciones.service');
const UserService = require('../services/users.service');
const { enviarEmail } = require('../mailer/SendEmail');
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

exports.getDenunciaDetalle = async (req, res, next) => {
    try {
        const denuncia = await DenunciaService.getDenunciaDetalle(parseInt(req.params.id));
        return res.status(200).json({
            status: 200,
            data: denuncia,
            message: "Denuncia Detalle recibida exitosamente",
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.getDenuncias = async (req, res, next) => {
    try {
        const pagination = req.query.quantity ? parseInt(req.query.quantity) : 10;
        const denuncias = await DenunciaService.getDenuncias(pagination, req.documento);

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
        const datosDenuncia = {
            documento: req.documento,
            idSitio: +req.body.idSitio,
            descripcion: req.body.descripcion ?? '',
            estado: "Iniciado",
            aceptaResponsabilidad: req.body.aceptaResponsabilidad ?? 1,
            fechaDenuncia: moment(),
            fechaHecho: req.body.fechaHecho ? moment(req.body.fechaHecho) : moment(),
            archivosURL: req.body.archivosURL ?? '',
            documentoDenunciado: req.body.documentoDenunciado ?? null,
        }

        const user = await UserService.getUser(datosDenuncia.documento);
        
        if(!user) throw Error(`El usuario con documento ${datosDenuncia.documento} no existe`);

        const denunciaCreated = await DenunciaService.createDenuncia(datosDenuncia);

        const datosMovimientoDenuncia = {
            idDenuncia: denunciaCreated.idDenuncia,
            responsable: "Municipio",
            causa: denunciaCreated.descripcion,
        }

        const datosNotificacion = {
            documento: datosDenuncia.documento,
            idGestion: denunciaCreated.idDenuncia,
            descripcion: 'D',
        }

        const emailData = {
            destination: user.dataValues.email,
            subject: "Denuncia generada",
            body: 
                `Su denuncia ha sido generada.\nEl número para su seguimiento es el #${datosMovimientoDenuncia.idDenuncia}`
        }

        await MovimientoDenunciasService.createMovimientoDenuncia(datosMovimientoDenuncia);
        await NotificacionService.createNotificacion(datosNotificacion);
        enviarEmail(emailData);

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
        const denunciaUpdated = await DenunciaService.updateDenuncia(parseInt(req.params.id), req.body.estado);

        const datosMovimientoDenuncia = {
            idDenuncia: req.params.id,
            responsable: "Municipio",
            causa: `La denuncia #${req.params.id} cambió su estado a: ${req.body.estado} a las ${moment().locale('es').format('LLL')} hs`,
        }

        const user = await UserService.getUser(parseInt(denunciaUpdated.dataValues.documento));

        const emailData = {
            destination: user.dataValues.email,
            subject: `Nuevo estado de la denuncia #${datosMovimientoDenuncia.idDenuncia}`,
            body: 
                `El estado de su denuncia #${datosMovimientoDenuncia.idDenuncia} ha sido cambiada a "${req.body.estado}".`
        }

        const datosNotificacion = {
            documento: denunciaUpdated.dataValues.documento,
            idGestion: denunciaUpdated.dataValues.idDenuncia,
            descripcion: 'D',
        }

        await MovimientoDenunciasService.createMovimientoDenuncia(datosMovimientoDenuncia);
        await NotificacionService.createNotificacion(datosNotificacion);
        enviarEmail(emailData);

        return res.status(200).json({
            status: 200,
            data: denunciaUpdated,
            message: "Successfully Denuncia Updated",
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};
