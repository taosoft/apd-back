const ServicioService = require("../services/servicios.service");
const UserService = require("../services/users.service");
const { enviarEmail } = require('../mailer/SendEmail');

// Saving the context of this module inside the _the variable
_this = this;

exports.getServicio = async (req, res, next) => {
    try {
        const sitio = await ServicioService.getServicio(req.params.id);
        return res.status(200).json({
            status: 200,
            data: sitio,
            message: "Serivicio encontrado exitósamente",
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.getServicioDetalle = async (req, res, next) => {
    try {
        const sitio = await ServicioService.getServicioDetalle(req.params.id);
        return res.status(200).json({
            status: 200,
            data: sitio,
            message: "Serivicio Detalle encontrado exitósamente",
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.getServicios = async (req, res, next) => {
    try {
        const sitios = await ServicioService.getServicios();

        return res.status(200).json({
            status: 200,
            data: sitios,
            message: "Serivicios encontrados exitósamente",
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.createServicio = async (req, res, next) => {
    try {
        if(await ServicioService.existeServicio(req.body.nombreServicio) > 0) {
            throw new Error(`El servicio ${req.body.nombreServicio} ya existe`);
        }

        const datosServicio = {
            idRubro: +req.body.idRubro,
            nombreServicio: req.body.nombreServicio,
            nombrePersona: req.body.nombrePersona,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            email: req.body.email,
            horario: req.body.horario,
            descripcion: req.body.descripcion ? req.body.descripcion : '',
            archivosURL: req.body.archivosURL ? req.body.archivosURL : ''
        }

        const servicioCreated = await ServicioService.createServicio(datosServicio);

        const user = await UserService.getUser(req.documento);

        const emailData = {
            destination: user.dataValues.email,
            subject: "Creación de servicio",
            body: 
                "Se ha enviado su solicitud de aprobación al municipio."
        }

        enviarEmail(emailData)

        return res.status(200).json({
            status: 200,
            data: servicioCreated,
            message: "Serivicio creado exitósamente",
        });
    } catch (e) {
        console.log(e)
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.updateServicio = async (req, res, next) => {
    try {
        let subj, bod;

        const datos = {
            servicioId: parseInt(req.params.id),
            estadoAprobado: req.body.aprobado,
        }

        const servicioAprobado = await ServicioService.updateServicio(datos);
        
        if (req.body.aprobado === 1) {
            subj = "Servicio aprobado"
            bod = "El servicio solicitado fue aprobado por el municipio y ya se encuentra habilitado en nuestra aplicación."
        } else {
            subj = "Servicio rechazado"
            bod = "El servicio solicitado no fue aprobado por el municipio."
        }

        const emailData = {
            destination: servicioAprobado.dataValues.email,
            subject: subj,
            body: bod
        }

        enviarEmail(emailData)

        return res.status(200).json({
            status: 200,
            data: {aprobado: servicioAprobado[0] },
            message: subj,
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};