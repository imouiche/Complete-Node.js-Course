
require('express-async-errors');
const winston = require('winston'); //for logging messages
//require('winston-mongodb');

module.exports = function () {
    //High level exception-> catch errors or exceptions not only at express level but for the entire app
    /* process.on('uncaughtException', (ex) => {
        winston.error(ex.message, ex);
        process.exit(1);
    }); */

    //another approach
    winston.handleExceptions(
        new winston.transports.Console({ colorizze: true, prettyPrint: true }),
        new winston.transports.File({ filename: 'uncaughtException.log' }));

    //unhandled Promises rejection
    process.on('unhandledRejection', (ex) => {
        throw ex;
        /*   winston.error(ex.message, ex);
        process.exit(1); */
    });

    winston.add(winston.transports.File, { filename: 'logfile.log' }); //Logged error to filename 'logfile.log'
    /* winston.add(winston.transports.MongoDB, {
        db: 'mongodb://localhost/vidly',
        level: 'error' // if we want to see only the error
    }); //logging to db */
}