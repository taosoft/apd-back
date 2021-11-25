const ComercioService = require("../services/comercios.service");
const UserService = require("../services/users.service");
const { enviarEmail } = require('../mailer/SendEmail');

// Saving the context of this module inside the _the variable
_this = this;

exports.getComercio = async (req, res, next) => {
    try {
        const comercio = await ComercioService.getComercio(req.params.id);
        return res.status(200).json({
            status: 200,
            data: comercio,
            message: "Comercio encontrado exitosamente",
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.getComercios = async (req, res, next) => {
    try {
        const pagination = req.query.quantity ? parseInt(req.query.quantity) : 100;
        const comercios = await ComercioService.getComercios(pagination);

        return res.status(200).json({
            status: 200,
            data: comercios,
            message: "Comercios encontrados exitosamente",
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.createComercio = async (req, res, next) => {
    try {

        if(await ComercioService.existeComercio(req.body.nombre) > 0) {
            throw new Error(`El comercio ${req.body.nombre} ya existe`);
        }

        const datosComercio = {
            nombre: req.body.nombre,
            horario: req.body.horario,
            descripcion: req.body.descripcion,
            direccion: req.body.direccion,
            archivosURL: req.body.archivosURL ? req.body.archivosURL : ''
        }

        const comercioCreated = await ComercioService.createComercio(datosComercio);

        const user = await UserService.getUser(req.documento);

        const emailData = {
            destination: user.dataValues.email,
            subject: "Creación de comercio",
            body: 
                "Se ha enviado su solicitud de aprobación al municipio."
        }

        enviarEmail(emailData)

        return res.status(200).json({
            status: 200,
            data: comercioCreated,
            message: "Comercio creado exitosamente",
        });
    } catch (e) {
        console.log(e)
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.updateComercio = async (req, res, next) => {
    try {
        const datos = {
            comercioId: parseInt(req.params.id),
            estadoAprobado: req.body.aprobado,
        }

        const comercioAprobado = await ComercioService.updateComercio(datos);
        
        return res.status(200).json({
            status: 200,
            data: {aprobado: comercioAprobado[0] },
            message: "Comercio Aprobado Exitosamente",
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};
