
//Authorization
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey')); //decoded payload
        req.user = decoded; //pass decoded payload to user which is here the user id
        next(); //pass control
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
};

