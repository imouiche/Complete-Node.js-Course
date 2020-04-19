
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


//getting the current user
// while router.get('/:id') is correct but it is not good for security as hakers may guess the id and get an info about our cutomer
//with 'me' we use the token 

router.get('/me', auth, async (req, res) => {
    // req.user._id coming from the auth token -> more secure way
    const user = await User.findById(req.user._id).select('-password'); // we excluded tpo show password to user
    res.send(user);

});

// ================== POST ==============================
router.post('/', async (req, res) => {
     //validation name and password
const {error} = validate(req.body);
if(error)
    return res.status(400).send(error.details[0].message);

//make sure the user is not already registered
//use findOne as we are not looking up by Id
let user = await User.findOne({email: req.body.email });
if(user) return res.status(400).send('User already registered');

/* user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
}) */
user = new User( _.pick(req.body, ['name', 'email', 'password']));
const salt = await bcrypt.genSalt(10); // generate the salt
user.password =  await bcrypt.hash(user.password, salt);
    
await user.save();

//Use lodash to select only properties we wnt to display to client
//res.send(_.pick(user, ['_id','name', 'email']));
//res.send(user);

// Setting the response header
const token = user.generateAuthToken();
res.header('x-auth-token', token).send(_.pick(user, ['_id','name', 'email'])); // x-auth-token is our token name we prefer

});

module.exports = router;