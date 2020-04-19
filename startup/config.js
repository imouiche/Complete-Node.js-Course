
const config = require('config');

module.exports = function () {
    //best practise to throw the error so the stack trace will be available later
    if (!config.get('jwtPrivateKey')) {
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined'); //if error winston will catch the error we throw to log it for future invest
    }

}