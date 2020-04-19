
const Joi = require('joi');
const mongoose = require('mongoose');

//Shema and model combined
const genreSchma = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});
const Genre = mongoose.model('Genre', genreSchma); //'Genre' is the name of the collection we want for the db


function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(5).max(50).required()
    }
    return Joi.validate(genre, schema);
}

exports.genreSchma = genreSchma;
exports.Genre = Genre;
exports.validate = validateGenre;

