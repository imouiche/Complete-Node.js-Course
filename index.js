/*
Create a backend service to manage a list of genres
*/
const winston = require('winston')
const express = require('express');
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);


//throw new Error('Something failed during startup. ');
/* 
const p = Promise.reject(new Error('Something failed miserably!'));
p.then(() => console.log('Done'));
 */

//Environment Variable
const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`Listening on port ${port} ...`));

module.exports = server;