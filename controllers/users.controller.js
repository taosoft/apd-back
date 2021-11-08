const UserService = require("../services/users.service")

// Saving the context of this module inside the _the variable
_this = this;

exports.getUser = async (req, res, next) => {
    try {
        const user = await UserService.getUser(req.params.id);
        return res.status(200).json({
            status: 200,
            data: user,
            message: "Successfully User Received",
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const userUpdated = await UserService.updateUser(req.params.id, req.body);
        
        return res.status(200).json({
            status: 200,
            data: userUpdated,
            message: "Successfully User Updated",
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.createUser = async (req, res, next) => {
    try {
        const dataUser = {
            documento: req.body.documento,
            email: req.body.email,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            contraseña: req.body.contraseña,
            inspector: req.body.inspector ?? 0,
        }
        const createdUser = await UserService.createUser(dataUser);
        
        return res.status(200).json({
            status: 200,
            data: createdUser,
            message: "Successfully User Created",
        });
    } catch (e) {
        return res.status(400).json({ 
            status: 400,
            message: "User Creation was Unsuccesfull",
            error: e.message,
        });
    }
};

exports.loginUser = async (req, res, next) => {
    try {
        const User = {
            documento: req.body.documento,
            contraseña: req.body.contraseña,
        };
        
        const loggedUserData = await UserService.loginUser(User);
        
        return res.status(201).json({ 
            data: loggedUserData,
            message: "Successfully login"
        });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({ status: 400, message: e.message });
    }
};
