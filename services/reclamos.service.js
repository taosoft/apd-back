const ReclamosModel = require('../models/reclamos.model');

// Saving the context of this module inside the _the variable
_this = this;

exports.getReclamo = async (reclamoId) => {
    try {
        return await ReclamosModel.findByPk(reclamoId);
    } catch (error) {
        throw Error("Error while searching Reclamo | ", error);
    }
};

exports.getReclamos = async (quantity) => {
    try {
        return await ReclamosModel.findAll({
            limit: quantity,
            order: ['idReclamo', 'documento']
        });
    } catch (error) {
        throw Error("Error while searching Reclamos | ", error);
    }
};

exports.createReclamo = async (newReclamo) => {
    try {
        return await ReclamosModel.create(newReclamo);
    } catch (error) {
        console.log(error)
        throw Error("Error while Creating a Reclamo | ", error);
    }
};

// exports.unificarReclamo = async () => {

// };

// exports.updateReclamo = async (reclamoId, datosReclamo) => {
//     try {

//         let bitacoraUpdate;
//         bitacoraNow = await ReclamosModel.findAll({
//             attributes: ['bitacora'],
//             where: {
//                 idReclamo: reclamoId,
//             }
//         }).then(bitacoraNow => {
//             bitacoraUpdate = bitacoraNow[0].dataValues.bitacora + ";" + datosReclamo.bitacora;
//             return bitacoraUpdate;
//         }).then( async bitacoraUpdate => {
//             return await ReclamosModel.update(
//                 { bitacora: bitacoraUpdate },
//                 { where: { idReclamo: reclamoId } }
//             )
//         })
//     } catch (error) {
//         throw Error("Error while updating Reclamo | ", error);
//     }
// };
