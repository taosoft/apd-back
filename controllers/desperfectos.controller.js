const DesperfectoService = require("../services/desperfectos.service");

// Saving the context of this module inside the _the variable
_this = this;

exports.getDesperfectos = async (req, res, next) => {
    try {
        const desperfectos = await DesperfectoService.getDesperfectos();

        return res.status(200).json({
            status: 200,
            data: desperfectos,
            message: "Desperfetos encontrados exitosamente",
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};