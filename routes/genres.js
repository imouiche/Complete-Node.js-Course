
//const asyncMiddleware = require('../middleware/async');
const validateObjectId = require('../middleware/validateObjectId')
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Genre, validate } = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


// ================== GET ==============================

router.get('/', async (req, res, next) => {
    //throw new Error('Could not get genres.');
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.get('/:id', validateObjectId, async (req, res) => {

    const genre = await Genre.findById(req.params.id);
    if (!genre)
        return res.status(404).send(`Genre with id = ${req.params.id} not found`);
    res.send(genre);
});

//===========================POST=====================================
router.post('/', auth, async (req, res) => {
    //validation
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    var genre = new Genre({ name: req.body.name });
    var genre = await genre.save();
    res.send(genre);

});

//============================PUT===========================================
router.put('/:id', auth, async (req, res) => {

    const { error } = validate(req.body);
    if (error)
        return res.status(404).send(error.details[0].message);
    //update first approach
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    })

    if (!genre)
        return res.status(404).send(`Genre with id = ${req.params.id} not found`);

    res.send(genre);

});

//================================Delete==================================
router.delete('/:id', [auth, admin], async (req, res) => {

    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre)
        return res.status(404).send(`Genre with id = ${req.params.id} not found`);

    res.send(genre);
})

module.exports = router;