const ServicioModel = require('../models/servicios.model');
const RubroModel = require('../models/rubros.model');

// Saving the context of this module inside the _the variable
_this = this;

exports.getServicio = async (servicioId) => {
    try {
        return await ServicioModel.findByPk(servicioId);
    } catch (error) {
        throw Error(`Error al buscar el Servicio ${servicioId} | `, error);
    }
};

exports.getServicioDetalle = async (servicioId) => {
    try {
        return await ServicioModel.findOne({
            where: { idServicio: servicioId },
            include: [
                { model: RubroModel }
            ]
        })
    } catch (error) {
        throw Error(`Error al buscar el Servicio ${servicioId} | `, error);
    }
};

exports.getServicios = async (pagination) => {
    try {
        return await ServicioModel.findAll({
            limit: pagination,
            where: { aprobado: 1 },
            order: [
                ['idServicio', 'ASC']
            ]
        });
    } catch (error) {
        throw Error(`Error al buscar todos los servicios | `, error);
    }
};

exports.createServicio = async (newServicio) => {
    try {
        return await ServicioModel.create(newServicio);
    } catch (error) {
        throw Error(`Error al crear el servicio ${newServicio.nombreServicio} | `, error);
    }
};

exports.existeServicio = async (nombreDelServicio) => {
    try {
        return await ServicioModel.count({ where: { nombreServicio: nombreDelServicio } });
        
    } catch (error) {
        throw Error(`Error al buscar si el servicio ${nombreDelServicio} ya existe | `, error)
    }
};

exports.updateServicio = async ({servicioId, estadoAprobado}) => {
    try {
        return await ServicioModel.update(
            { aprobado: estadoAprobado },
            { where: { idServicio: servicioId } }
        );
        
    } catch (error) {
        throw Error(`Error actualizar el servicio ${servicioId} | `, error)
    }
};
