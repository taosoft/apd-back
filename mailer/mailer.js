const nodemailer = require("nodemailer");

module.exports = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.USER_MAIL,
        pass: process.env.USER_PASSWORD,
    },
});