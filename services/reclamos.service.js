const ReclamosModel = require('../models/reclamos.model');
const VecinosModel = require("../models/vecinos.model");
const UserModel = require('../models/users.model');
const SitioModel = require('../models/sitios.model');
const RubroModel = require('../models/rubros.model');
const DesperfectoModel = require('../models/desperfectos.model');
const moment = require("moment");

// Saving the context of this module inside the _the variable
_this = this;

exports.getReclamo = async (reclamoId) => {
    try {
        return await ReclamosModel.findByPk(reclamoId);
    } catch (error) {
        throw Error("Error while searching Reclamo | ", error);
    }
};

exports.getReclamos = async () => {
    try {
        return await ReclamosModel.findAll({
            order: ['idReclamo', 'documento'],
            include: [
                { model: SitioModel},
            ]
        });
    } catch (error) {
        throw Error("Error while searching Reclamos | ", error);
    }
};

exports.getReclamosInspector = async (rubroId) => {
    try {
        return await ReclamosModel.findAll({
            where: { idRubro: rubroId },
            order: ['idReclamo', 'documento'],
            include: [
                { model: SitioModel},
            ]
        });
    } catch (error) {
        throw Error("Error while searching Reclamos | ", error);
    }
};

exports.getReclamoDetalle = async (reclamoId) => {
    try {
        return await ReclamosModel.findOne({
            where: { idReclamo: reclamoId },
            include: [
                { model: UserModel },
                { model: SitioModel },
                { model: DesperfectoModel },
                { model: RubroModel },
            ]
        });
    } catch (error) {
        throw Error("Error while searching Reclamos Detalle | ", error);
    }
};

exports.createReclamo = async (newReclamo) => {
    try {
        return await ReclamosModel.create(newReclamo);
    } catch (error) {
        throw Error("Error while Creating a Reclamo | ", error);
    }
};

exports.existeVecino = async (documento) => {
    try {
        const existeVecino = await VecinosModel.findOne({ where: { documento } });

        if (existeVecino === null) return false;
        else return true;
    } catch (error) {
        throw Error("Error while searching vecino | ", error)
    }
};

// exports.unificarReclamo = async () => {

// };

// exports.updateReclamo = async (reclamoId, datosReclamo) => {
//     try {

//         let bitacoraUpdate;
//         bitacoraNow = await ReclamosModel.findOne({
//             attributes: ['bitacora'],
//             where: {
//                 idReclamo: reclamoId,
//             }
//         }).then( bitacoraNow => {
//             bitacoraUpdate = bitacoraNow.dataValues.bitacora + ";" + `El reclamo #${reclamoId} cambi?? su estado a: ${datosReclamo.estado} a las ${moment().locale('es').format('LLL')} hs`;
//             return bitacoraUpdate;
//         }).then(async bitacoraUpdate => {
//             return await ReclamosModel.update(
//                 {
//                     bitacora: bitacoraUpdate,
//                     estado: datosReclamo.estado
//                 },
//                 { where: { idReclamo: reclamoId } }
//             )
//         })
//     } catch (error) {
//         throw Error("Error while updating Reclamo | ", error);
//     }
// };

exports.updateReclamo = async (reclamoId, datosReclamo) => {
    try {       
        const reclamo = await ReclamosModel.findByPk(reclamoId);

        reclamo.bitacora = reclamo.dataValues.bitacora + ";" + `El reclamo #${reclamoId} cambi?? su estado a: ${datosReclamo.estado} a las ${moment().locale('es').format('LLL')} hs`;
        reclamo.estado = datosReclamo.estado;

        return await reclamo.save();

    } catch (error) {
        throw Error("Error while updating Reclamo | ", error);
    }
};
