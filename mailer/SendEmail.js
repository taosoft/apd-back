const mailer = require('./mailer');

exports.enviarEmail = ({ destination, subject, body }) => {
    const email_destino = destination;
    const mailOptions = {
        from: 'no-reply@municipio.com',
        to: email_destino,
        subject: subject,
        html:
            `<p>${body}</p>`,
    };

    mailer.sendMail(mailOptions, (err) => {
        if (err) return console.log(err.message);
        console.log("Se envió un email");
    });
};
