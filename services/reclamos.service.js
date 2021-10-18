const ReclamoModel = require('../models/reclamos.model');

// Saving the context of this module inside the _the variable
_this = this;

exports.getReclamo = async (reclamoId) => {
    try {
        return await ReclamoModel.findByPk(reclamoId);
    } catch (error) {
        throw Error("Error while searching Reclamo");
    }
};

exports.getReclamos = async (quantity) => {
    try {
        return await ReclamoModel.findAll({ 
            limit: quantity,
            order: ['idReclamo','documento']
        });
    } catch (error) {
        throw Error("Error while searching Reclamos");
    }
};

exports.createReclamo = async () => {

};

exports.unificarReclamo = async () => {
    
};

exports.updateReclamo = async () => {

};
