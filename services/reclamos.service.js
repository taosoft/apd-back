const ReclamosModel = require('../models/reclamos.model');

// Saving the context of this module inside the _the variable
_this = this;

exports.getReclamo = async (reclamoId) => {
    try {
        return await ReclamosModel.findByPk(reclamoId);
    } catch (error) {
        throw Error("Error while searching Reclamo");
    }
};

exports.getReclamos = async (quantity) => {
    try {
        return await ReclamosModel.findAll({ 
            limit: quantity,
            order: ['idReclamo','documento']
        });
    } catch (error) {
        throw Error("Error while searching Reclamos");
    }
};

exports.createReclamo = async (newReclamo) => {
    try {
        return await ReclamosModel.create(newReclamo);
    } catch (error) {
        throw Error("Error while Creating a Reclamo");
    }
};

exports.unificarReclamo = async () => {
    
};

exports.updateReclamo = async () => {

};
