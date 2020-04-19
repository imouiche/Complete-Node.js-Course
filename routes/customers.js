
//Building a custmer endpoint

const {Customer, validate} = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//Shema and model combined


// ================== GET ==============================
router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});
router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if(!customer)
        return res.status(404).send(`Genre with id = ${req.params.id} not found`);
    res.send(customer);
});

//===========================POST=====================================
router.post('/', async (req, res) => {
    //validation
const {error} = validate(req.body);
if(error)
    return res.status(400).send(error.details[0].message);

var customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold
});
var customer = await customer.save();
res.send(customer);

});

//============================PUT===========================================
 router.put('/:id', async (req, res) => {
    
    const {error} = validate(req.body);
    if(error)
        return res.status(404).send(error.details[0].message);
    //update first approach
   const customer = await Customer.findByIdAndUpdate(req.params.id, {
       name: req.body.name,
       phone: req.body.phone,
       isGold: req.body.isGold
    }, {new: true});

    if(!customer)
        return res.status(404).send(`Genre with id = ${req.params.id} not found`);
    
    res.send(customer);

}); 

//================================Delete==================================
 router.delete('/:id', async (req, res) => {

const customer = await Customer.findByIdAndRemove(req.params.id);
    if(!customer)
        return res.status(404).send(`Genre with id = ${req.params.id} not found`);
    
    res.send(customer);
});



module.exports = router;