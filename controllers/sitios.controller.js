const SitioService = require("../services/sitio.service");

// Saving the context of this module inside the _the variable
_this = this;

exports.getSitio = async (req, res, next) => {
    try {
        const sitio = await SitioService.getSitio(req.params.id);
        return res.status(200).json({
            status: 200,
            data: sitio,
            message: "Successfully Reclamo Received",
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.getSitios = async (req, res, next) => {
    try {
        const pagination = req.query.quantity ? parseInt(req.query.quantity) : 10;
        const sitios = await SitioService.getSitios(pagination);

        return res.status(200).json({
            status: 200,
            data: sitios,
            message: "Successfully Sitios Received",
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};