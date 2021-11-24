const UserService = require("../services/users.service")
const { enviarEmail } = require('../mailer/SendEmail')

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
        const userUpdated = await UserService.updateUser(parseInt(req.params.id), req.body);
        console.log(userUpdated)
        const emailData = {
            destination: userUpdated.dataValues.email,
            subject: "Datos Personales Actualizados",
            body: 
                "Se ha actualizado su email y/o contraseña. Si ha sido usted, por favor desestime este email, de lo contrario contacte al municipio cuanto antes."
        }

        enviarEmail(emailData)

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
            contraseña: Math.random().toString(36).slice(-8),
            inspector: req.body.inspector ?? 0,
        }

        const createdUser = await UserService.createUser(dataUser);
        
        const emailData = {
            destination: dataUser.email,
            subject: "Usuario creado",
            body: 
                `Se le ha asignado un usuario para la aplicación "Municipalidad".\nDeberá ingresar con su documento y contraseña: ${dataUser.contraseña}.\nPor favor cambie la misma cuanto antes, ingresando en la sección "Perfil" de la aplicación.`
        }
        enviarEmail(emailData)

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

exports.resetPassword = async (req, res, next) => {
    try {
        const user = await UserService.getUser(req.params.id);
        
        if(!user) throw Error("User doesn't exist");

        const userData = {
            email: user.dataValues.email,
            contraseña: Math.random().toString(36).slice(-8)
        }

        const userUpdated = await UserService.updateUser(parseInt(req.params.id), userData);

        const emailData = {
            destination: userUpdated.dataValues.email,
            subject: "Recupero de contraseña",
            body: 
                `Su nueva contraseña es: ${userData.contraseña}. Por favor cambiarla cuanto antes.`
        }
        enviarEmail(emailData)

        return res.status(200).json({ 
            data: true,
            message: "Contraseña blanqueada exitosamente"
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};
