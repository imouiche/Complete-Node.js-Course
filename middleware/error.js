

//only catch errors happen in the request processing pipeline
//cannot catch error happening during the startup
const winston = require('winston');

module.exports = function (err, req, res, next) {
    //Log the exception
    // second arg is called metadata
    winston.error(err.message, err); //Or winston.log('error', err.message);

    // error
    // warn
    // info
    // verbose
    // debug
    // silly

    res.status(500).send('Something failed. ');
}