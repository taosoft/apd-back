const ComercioService = require("../services/comercios.service");

// Saving the context of this module inside the _the variable
_this = this;

exports.getComercio = async (req, res, next) => {
    try {
        const comercio = await ComercioService.getComercio(req.params.id);
        return res.status(200).json({
            status: 200,
            data: comercio,
            message: "Comercio encontrado exitosamente",
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.getComercios = async (req, res, next) => {
    try {
        const pagination = req.query.quantity ? parseInt(req.query.quantity) : 10;
        const comercios = await ComercioService.getComercios(pagination);

        return res.status(200).json({
            status: 200,
            data: comercios,
            message: "Comercios encontrados exitosamente",
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.createComercio = async (req, res, next) => {
    try {

        if(await ComercioService.existeComercio(req.body.nombre) > 0) {
            throw new Error(`El comercio ${req.body.nombre} ya existe`);
        }

        const datosComercio = {
            nombre: req.body.nombre,
            horario: req.body.horario,
            descripcion: req.body.descripcion,
            archivosURL: req.body.archivosURL ? req.body.archivosURL : ''
        }

        const comercioCreated = await ComercioService.createComercio(datosComercio);

        return res.status(200).json({
            status: 200,
            data: comercioCreated,
            message: "Comercio creado exitosamente",
        });
    } catch (e) {
        console.log(e)
        return res.status(400).json({ status: 400, message: e.message });
    }
};
