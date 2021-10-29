const UserModel = require('../models/users.model');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

// Saving the context of this module inside the _the variable
_this = this;

exports.getUser = async (documento) => {
    try {
        return await UserModel.findByPk(documento);
    } catch (error) {
        throw Error("Error while searching Reclamo");
    }
};

exports.updateUser = async (user) => {
    try {

        const userDatabase = this.getUser(user.documento);

        if(!userDatabase) throw Error("User doesn't exist");

        const hashedPassword = bcrypt.hashSync(user.contraseña, 8);

        const updatedUserData = {
            email: user.email,
            contraseña: hashedPassword
        };

        const updatedUser = await UserModel.update(updatedUserData, {
            where: { documento: user.documento }
        });

        return updatedUser;

    } catch (error) {
        throw Error("Error while updating User");
    }
};

exports.createUser = async (user) => {
    try {
        const hashedPassword = bcrypt.hashSync(user.contraseña, 8);

        const newUser = {
            documento: user.documento,
            email: user.email,
            nombre: user.nombre,
            apellido: user.apellido,
            contraseña: hashedPassword
        };
        
        const savedUser = await UserModel.create(newUser);
        return { createdUser: savedUser };
        
    } catch (error) {
        console.log(error);
        throw Error("Error while Creating User");
    }
};

exports.loginUser = async (user) => {
    try {
        const _details = await UserModel.findOne({ where: { email: user.email }});
        
        const passwordIsValid = bcrypt.compareSync(user.contraseña, _details.contraseña);
        
        if (!passwordIsValid) throw Error("Invalid username/password");

        const token = jwt.sign(
            { documento: _details.documento, },
            process.env.SECRET,
            { expiresIn: "7d", }
        );

        return { token: token, user: _details };
    } catch (e) {
        // return a Error message describing the reason
        throw Error("Error while Login User");
    }
};