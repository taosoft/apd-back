const UserService = require("../services/user.service")

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
        const user = await UserService.getUser();
        return res.status(200).json({
            status: 200,
            data: user,
            message: "Successfully User Received",
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.createUser = async (req, res, next) => {

};

exports.loginUser = async (req, res, next) => {
    
};