
const express = require('express');
const router = express.Router();

const genres = [
    {id: 1, genre: 'action'},
    {id: 2, genre: 'Romance'},
    {id: 3, genre: 'comedy'},
    {id: 4, genre: 'crime'},
    {id: 5, genre: 'drama'},
    {id: 6, genre: 'fantasy'},
];

// ================== GET ==============================
router.get('/', (req, res) => {
    res.send(genres);
});
router.get('/:id', (req, res) => {
    const genre = genres.find(genre => genre.id === parseInt(req.params.id));
    if(!genre)
        return res.status(404).send(`Genre with id = ${req.params.id} not found`);
    res.send(genre);
});

//===========================POST=====================================
router.post('/', (req, res) => {
const genre = {
    id: genres.length + 1,
    genre: req.body.genre
};
//validation
const {error} = validateGenre(req.body);
if(error)
    return res.status(400).send(error.details[0].message);

genres.push(genre);
res.send(genre);

});

//============================PUT===========================================
router.put('/:id', (req, res) => {
    const genre = genres.find(genre => genre.id === parseInt(req.params.id));
    if(!genre)
        return res.status(404).send(`Genre with id = ${req.params.id} not found`);
    
    const {error} = validateGenre(req.body);
    if(error)
        return res.status(404).send(error.details[0].message);
    
    genre.genre = req.body.genre;
    res.send(genre);

});

//================================Delete==================================
router.delete('/:id', (req, res) => {
    const genre = genres.find(genre => genre.id === parseInt(req.params.id));
    if(!genre)
        return res.status(404).send(`Genre with id = ${req.params.id} not found`);
    
    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
})


function validateGenre(genre){
    const schema = {
        genre: Joi.string().min(3).required()
    }
    return Joi.validate(genre, schema);
}

module.exports = router;
