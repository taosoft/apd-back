const DesperfectoModel = require('../models/desperfectos.model');

// Saving the context of this module inside the _the variable
_this = this;

exports.getDesperfectos = async () => {
    try {
        return await DesperfectoModel.findAll({
            order: ['idDesperfecto', 'idRubro', 'descripcion']
        });
    } catch (error) {
        throw Error(`Error al buscar todos los desperfectos | `, error);
    }
};