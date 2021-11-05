const ServicioService = require("../services/servicios.service");

// Saving the context of this module inside the _the variable
_this = this;

exports.getServicio = async (req, res, next) => {
    try {
        const sitio = await ServicioService.getServicio(req.params.id);
        return res.status(200).json({
            status: 200,
            data: sitio,
            message: "Serivicio encontrado exitósamente",
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.getServicios = async (req, res, next) => {
    try {
        const pagination = req.query.quantity ? parseInt(req.query.quantity) : 10;
        const sitios = await ServicioService.getServicios(pagination);

        return res.status(200).json({
            status: 200,
            data: sitios,
            message: "Serivicios encontrados exitósamente",
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.createServicio = async (req, res, next) => {
    try {
        if(await ServicioService.existeServicio(req.body.nombreServicio) > 0) {
            throw new Error(`El servicio ${req.body.nombreServicio} ya existe`);
        }

        const datosServicio = {
            idRubro: +req.body.idRubro,
            nombreServicio: req.body.nombreServicio,
            nombrePersona: req.body.nombrePersona,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            email: req.body.email,
            horario: req.body.horario,
            descripcion: req.body.descripcion ? req.body.descripcion : '',
            archivosURL: req.body.archivosURL ? req.body.archivosURL : ''
        }

        const servicioCreated = await ServicioService.createServicio(datosServicio);

        return res.status(200).json({
            status: 200,
            data: servicioCreated,
            message: "Serivicio creado exitósamente",
        });
    } catch (e) {
        console.log(e)
        return res.status(400).json({ status: 400, message: e.message });
    }
};
