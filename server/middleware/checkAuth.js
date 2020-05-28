const jwt = require("jsonwebtoken");
const secret = require('../config/keys').secretToken;

const checkAuth = (req, res, next) => {
    const token = req.header('x-auth-token');

    if(!token) {
        res.status(401)
        // .json({msg: "Please login"});
    } else {
        jwt.verify(token, secret, (err, decoded) => {
            if(err) {
                res.status(403).json({msg: "session expired"});
            } else {
                req.username = decoded.username
                next();
            };
        });
    };
};

module.exports = checkAuth;