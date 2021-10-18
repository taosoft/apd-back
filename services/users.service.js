const UserModel = require('../models/users.model');

// Saving the context of this module inside the _the variable
_this = this;

exports.getUser = async (userId) => {
    try {
        return await UserModel.findByPk(userId);
    } catch (error) {
        throw Error("Error while searching Reclamo");
    }
};

exports.updateUser = async () => {

};

exports.createUser = async () => {

};

exports.loginUser = async () => {
    
};