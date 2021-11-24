const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
    let token = req?.headers["authorization"] || req?.headers["x-access-token"];

    if (!token) res.status(500).send({ auth: false, message: "No token provided." });

    console.log(token)

    if (token?.startsWith("Bearer ")) {
        token = token.slice(7, token.length);

        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                res.status(500).send({ auth: false, message: "Failed to authenticate token." });
            }
            req.documento = decoded.documento;
            req.tipoUsuario = decoded.tipoUsuario;
            next();
        });
    }
    else {
        res.status(500).send({ auth: false, message: "Token does not exist" });
    }
};

module.exports = authorization;
