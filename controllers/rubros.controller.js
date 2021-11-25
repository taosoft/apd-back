const RubroService = require("../services/rubros.service");
const UserService = require("../services/users.service")

// Saving the context of this module inside the _the variable
_this = this;

exports.getRubros = async (req, res, next) => {
    try {
        let rubros;

        if (req.tipoUsuario === 1) {
            rubros = await RubroService.getRubrosInspector(user.dataValues.idRubro);
        } else {
            rubros = await RubroService.getRubros();
        }

        return res.status(200).json({
            status: 200,
            data: rubros,
            message: "Rubros encontrados exitosamente",
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};