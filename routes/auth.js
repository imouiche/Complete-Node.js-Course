
const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


// ================== POST ==============================
router.post('/', async (req, res) => {
     //validation name and password
const {error} = validate(req.body);
if(error)
    return res.status(400).send(error.details[0].message);

//make sure the user is not already registered
//use findOne as we are not looking up by Id
let user = await User.findOne({email: req.body.email });
if(!user) return res.status(400).send('Invalid email or password');

//validate password
const validPassword = await bcrypt.compare(req.body.password, user.password);
if(!validPassword) return res.status(400).send('Invalid email or password');

//json web token
//const token = jwt.sign({_id: user._id}, 'jwtPrivateKey'); // Payload and  'jwtPrivateKey' is our private key TODONOT store here
const token = user.generateAuthToken();
res.send(token);


});

function validate(req){
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required() // we'll hash this passw to get a long string to store it in mongodb
    };
    return Joi.validate(req, schema);
}

module.exports = router;