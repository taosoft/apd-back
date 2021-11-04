const ComercioService = require("../services/comercios.service");

// Saving the context of this module inside the _the variable
_this = this;

exports.getComercio = async (req, res, next) => {
    try {
        const reclamo = await ComercioService.getComercio(req.params.id);
        return res.status(200).json({
            status: 200,
            data: reclamo,
            message: "Successfully Comercio Received",
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.getComercios = async (req, res, next) => {
    try {
        const pagination = req.query.quantity ? parseInt(req.query.quantity) : 10;
        const denuncias = await ComercioService.getComercios(pagination);

        return res.status(200).json({
            status: 200,
            data: denuncias,
            message: "Successfully Comercios Received",
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.createComercio = async (req, res, next) => {

};
