const ServicioModel = require('../models/servicios.model');

// Saving the context of this module inside the _the variable
_this = this;

exports.getServicio = async (servicioId) => {
    try {
        return await ServicioModel.findByPk(servicioId);
    } catch (error) {
        throw Error(`Error al buscar el Servicio ${servicioId} | `, error);
    }
};

exports.getServicios = async (pagination) => {
    try {
        return await ServicioModel.findAll({
            limit: pagination,
            order: ['idServicio', 'nombreServicio']
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
        const existeServicio = await ServicioModel.findOne({ where: { nombreServicio: nombreDelServicio } });

        if (existeServicio === null) return false;
        else return true;
    } catch (error) {
        throw Error(`Error al buscar si el servicio ${nombreDelServicio} ya existe | `, error)
    }
};
