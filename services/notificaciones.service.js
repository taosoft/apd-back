const NotificacionesModel = require('../models/notificaciones.model');

// Saving the context of this module inside the _the variable
_this = this;

exports.getNotificaciones = async (doc) => {
    try {
        return  await NotificacionesModel.findAll({
            where: { 
                documento: doc,
                visto: 0,
            },
            raw: true,
            order: [
                ['id', 'DESC'],
            ]
        },);

    } catch (error) {
        throw Error(`Error al buscar todas las notificaciones | `, error);
    }
};

exports.createNotificacion = async (newNotificacion) => {
    try {
        return await NotificacionesModel.create(newNotificacion);
    } catch (error) {
        throw Error(`Error al crear la notificacion`, error);
    }
};

exports.updateNotificacion = async ({ notificacionId, newVisto }) => {
    try {
        return await NotificacionesModel.update(
            { visto: newVisto },
            { where: { id: notificacionId } }
        );
    } catch (error) {
        throw Error(`Error al actualizar la notificacion #${notificacionId}`, error);
    }
};
