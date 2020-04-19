const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    isGold: {
        type: Boolean,
    default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
})); //'Genre' is the name of the collection we want for the db

function validateCustomer(customer){
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.Boolean()
    }
    return Joi.validate(customer, schema);
}

async function createCustomer(name, phone){
    const customer = new Customer({
        name,
        phone
    });

    const result = await customer.save();
    console.log(result);
}

//createCustomer('Ouretou', '1234456');
exports.Customer = Customer;
exports.validate = validateCustomer;