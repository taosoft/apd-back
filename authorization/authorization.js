const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
    let token = req.headers["authorization"] || req.headers["x-access-token"];

    if (!token) res.status(500).send({ auth: false, message: "No token provided." });

    if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);

        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) res.status(500).send({ auth: false, message: "Failed to authenticate token." });
            req.userId = decoded.id;
            next();
        });
    }
};

module.exports = authorization;