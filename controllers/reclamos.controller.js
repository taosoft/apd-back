const ReclamoService = require("../services/reclamos.service");
const MovimientoReclamosService = require("../services/movimientoReclamo.service");
const NotificacionService = require("../services/notificaciones.service");
const UserService = require('../services/users.service');
const { enviarEmail } = require('../mailer/SendEmail');
const moment = require("moment");

// Saving the context of this module inside the _the variable
_this = this;

exports.getReclamo = async (req, res, next) => {
    try {
        const reclamo = await ReclamoService.getReclamo(parseInt(req.params.id));
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
        let reclamos;
        
        if (req.tipoUsuario === 1) {
            reclamos = await ReclamoService.getReclamosInspector(user.dataValues.idRubro);
        } else {
            reclamos = await ReclamoService.getReclamos();
        } 

        return res.status(200).json({
            status: 200,
            data: reclamos,
            message: "Successfully Reclamos Received",
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.getReclamoDetalle = async (req, res, next) => {
    try {
        const reclamo = await ReclamoService.getReclamoDetalle(parseInt(req.params.id));

        return res.status(200).json({
            status: 200,
            data: reclamo,
            message: "Successfully Reclamos Received",
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.createReclamo = async (req, res, next) => {
    try {
        const datosReclamo = {
            documento: req.documento,
            idSitio: +req.body.idSitio,
            idRubro: +req.id.idRubro,
            idDesperfecto: +req.body.idDesperfecto,
            descripcion: req.body.descripcion ? req.body.descripcion : '',
            estado: "Iniciado",
            archivosURL: req.body.archivosURL ? req.body.archivosURL : '',
            bitacora: `Reclamo creado el ${moment().locale('es').format('LLL')} hs`,
        }

        const user = await UserService.getUser(datosReclamo.documento);
        
        if(!user) throw Error(`El usuario con documento ${datosReclamo.documento} no existe`);

        const reclamosCreated = await ReclamoService.createReclamo(datosReclamo);

        const datosMovimientoReclamo = {
            idReclamo: reclamosCreated.idReclamo,
            responsable: "Municipio",
            causa: `Reclamo creado el ${moment().locale('es').format('LLL')} hs`,
        }

        const datosNotificacion = {
            documento: datosReclamo.documento,
            idGestion: reclamosCreated.idReclamo,
            descripcion: 'R',
        }

        const emailData = {
            destination: user.dataValues.email,
            subject: "Reclamo generado",
            body: 
                `Su reclamo ha sido generado.\nEl número para su seguimiento es el #${datosMovimientoReclamo.idReclamo}`
        }

        await MovimientoReclamosService.createMovimientoReclamo(datosMovimientoReclamo);
        await NotificacionService.createNotificacion(datosNotificacion);
        enviarEmail(emailData);

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
            causa: `El reclamo #${req.params.id} cambió su estado a: ${datosReclamo.estado} a las ${moment().locale('es').format('LLL')} hs`,
        }

        const user = await UserService.getUser(parseInt(reclamoUpdated.dataValues.documento));

        const emailData = {
            destination: user.dataValues.email,
            subject: `Nuevo estado del reclamo #${datosMovimientoReclamo.idReclamo}`,
            body: 
                `El estado de su reclamo #${datosMovimientoReclamo.idReclamo} ha sido cambiado a "${datosReclamo.estado}".`
        }

        await MovimientoReclamosService.createMovimientoReclamo(datosMovimientoReclamo);
        enviarEmail(emailData);

        return res.status(200).json({
            status: 200,
            data: reclamoUpdated,
            message: "Successfully Reclamo Updated",
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};
