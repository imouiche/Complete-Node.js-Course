
const mongoose = require('mongoose');

module.exports = function (req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.body.id))
        return res.status(404).send('Invalid Id.');

    next();
}