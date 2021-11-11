const RubrosModel = require('../models/rubros.model');

// Saving the context of this module inside the _the variable
_this = this;

exports.getRubros = async () => {
    try {
        return await RubrosModel.findAll({
            order: ['idRubro', 'descripcion']
        });
    } catch (error) {
        throw Error(`Error al buscar todos los rubros | `, error);
    }
};