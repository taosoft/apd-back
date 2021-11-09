const DesperfectoModel = require('../models/desperfectos.model');

// Saving the context of this module inside the _the variable
_this = this

exports.getDesperfecto = async (idDesperfecto) => {
    try {
        return await DesperfectoModel.findByPk(idDesperfecto);
    } catch (error) {
        throw Error(`Error al buscar el desperfecto #${idDesperfecto} | `, error);
    }
};

exports.getDesperfectos = async () => {
    try {
        return await DesperfectoModel.findAll({
            order: ['idDesperfecto', 'idRubro', 'descripcion']
        });
    } catch (error) {
        throw Error(`Error al buscar todos los desperfectos | `, error);
    }
};
