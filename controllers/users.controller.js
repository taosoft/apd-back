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
        const userUpdated = await UserService.updateUser(req.body);
        return res.status(200).json({
            status: userUpdated,
            data: user,
            message: "Successfully User Updated",
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.createUser = async (req, res, next) => {
    try {
        const createdUser = await UserService.createUser(req.body);
        
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
            email: req.body.email,
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
