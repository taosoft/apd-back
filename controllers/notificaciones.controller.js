const NotificacionService = require("../services/notificaciones.service");
const ReclamoService = require("../services/reclamos.service")
const DenunciaService = require("../services/denuncias.service")

// Saving the context of this module inside the _the variable
_this = this;

exports.getNotificaciones = async (req, res, next) => {
    try {        
        // req.params.id -> es el documento
        const notificaciones = await NotificacionService.getNotificaciones(req.documento);

        const response = await Promise.all(notificaciones.map(async (notificacion) => {
                if(notificacion.descripcion === 'R') {
                    const reclamo = await ReclamoService.getReclamo(notificacion.idGestion);
                    return {
                        id: reclamo.dataValues.idReclamo.toString(),
                        idNotificacion: notificacion.id.toString(),
                        fecha: reclamo.dataValues.fecha,
                        imgUsuario: reclamo.dataValues.archivosURL.split(';').pop() ?? '',
                        texto: reclamo.dataValues.estado,
                        titulo: 'Reclamo',
                    }
                } else {
                   const denuncia = await DenunciaService.getDenuncia(notificacion.idGestion);
                   return {
                        id: denuncia.dataValues.idDenuncia.toString(),
                        idNotificacion: notificacion.id.toString(),
                        fecha: denuncia.dataValues.fechaDenuncia,
                        imgUsuario: denuncia.dataValues.archivosURL.split(';').pop() ?? '',
                        texto: denuncia.dataValues.estado,
                        titulo: 'Denuncia',
                    }
                }
            })
        )

        return res.status(200).json({
            status: 200,
            data: response,
            message: "Notificaciones exitosamente recibidas",
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.updateNotification = async (req, res, next) => {
    try {
        // req.params.id -> id de la notificacion
        const datosNotificacion = {
            notificacionId: parseInt(req.params.id),
            newVisto: req.body.visto,
        }
        
        const notificacionUpdated = await NotificacionService.updateNotificacion(datosNotificacion);

        console.log("Response", notificacionUpdated)

        return res.status(200).json({
            status: 200,
            data: notificacionUpdated,
            message: "Notificacion actualizada exitosamente",
        });
    } catch (e) {
        console.log(e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}