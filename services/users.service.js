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

exports.updateUser = async (doc, user) => {
    try {
        const userDatabase = await this.getUser(doc);

        if(!userDatabase) throw Error("User doesn't exist");
        let hashedPassword;

        if(user.contraseña) {
            hashedPassword = bcrypt.hashSync(user.contraseña, 8);
        }

        userDatabase.email = user.email ? user.email : userDatabase.email;
        userDatabase.contraseña = user.contraseña ? hashedPassword : userDatabase.contraseña;

        return await userDatabase.save();

    } catch (error) {
        throw Error("Error while updating User");
    }
};

exports.createUser = async (user) => {
    try {
        const hashedPassword = bcrypt.hashSync(user.contraseña, 8);

        const newUser = {
            ...user,
            contraseña: hashedPassword
        };
        
        const createdUser = await UserModel.create(newUser);
        return createdUser;
        
    } catch (error) {
        console.log(error);
        throw Error("Error while Creating User");
    }
};

exports.loginUser = async (user) => {
    try {
        const _details = await UserModel.findOne({ where: { documento: user.documento }});

        const passwordIsValid = bcrypt.compareSync(user.contraseña, _details.dataValues.contraseña);

        if (!passwordIsValid) throw Error("Invalid username/password");

        const token = jwt.sign(
            { documento: _details.dataValues.documento, },
            process.env.SECRET,
            { expiresIn: "1d", }
        );
        
        return { token: token, user: _details.dataValues };
    } catch (e) {
        // return a Error message describing the reason
        throw Error("Error while Login User");
    }
};

exports.existeUser = async (documento) => {
    try {
        const existeVecino = await UserModel.findOne({ where: { documento } });

        if (existeVecino === null) return false;
        else return true;
    } catch (error) {
        throw Error("Error while searching vecino | ", error)
    }
};