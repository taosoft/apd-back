const NotificacionService = require("../services/notificaciones.service");

// Saving the context of this module inside the _the variable
_this = this;

exports.getNotificaciones = async (req, res, next) => {
    try {
        // req.params.id -> es el documento
        const notificaciones = await NotificacionService.getNotificaciones(parseInt(req.params.id));

        return res.status(200).json({
            status: 200,
            data: notificaciones,
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
            notificacionId: req.params.id,
            visto: 1,
        }
        
        const notificacionUpdated = await NotificacionService.updateNotificacion(datosNotificacion);

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