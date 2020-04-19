
const request = require('supertest');
const { Genre } = require('../../models/genre'); // used to populate the db
const { User } = require('../../models/user');
const mongoose = require('mongoose');

let server;
describe('/api/genres', () => {
    //load and close the server before each test
    beforeEach(() => { server = require('../../index'); }) //listening on port 3000
    afterEach(async () => {
        server.close(); // close the server on port 3000 to allow other tests to reun successfully.
        await Genre.remove({}) //clean up
    });

    describe('GET /', () => {
        it('should return all genres', async () => {
            //populating the db
            await Genre.collection.insertMany([
                { name: 'genre1' },
                { name: 'genre2' },
            ]);
            const res = await request(server).get('/api/genres');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
            expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();
        });
    });

    //Get by id
    describe('GET /:id', () => {
        it('should return a genre if valid id is passed', async () => {
            const genre = new Genre({ name: 'genre1' });
            await genre.save();

            const res = await request(server).get('/api/genres/' + genre._id);

            expect(res.status).toBe(200);
            // expect(res.body).toMatchObject(genre);
            expect(res.body).toHaveProperty('name', genre.name);
        });

        it('should return 404 if invalid id is passed', async () => {

            const res = await request(server).get('/api/genres/1');

            expect(res.status).toBe(404);
            // expect(res.body).toMatchObject(genre);
        });

        it('should return 404 if no genre with the given id exists', async () => {
            const id = mongoose.Types.ObjectId();
            const res = await request(server).get('/api/genres/' + id);

            expect(res.status).toBe(404);
            // expect(res.body).toMatchObject(genre);
        });
    })

    describe('POST /', () => {
        //Define teh happy path and then in each test, we change one parameter that clearly aligns with the same of the 
        // test

        let token;
        let name;

        const exec = async () => {

            return await request(server)
                .post('/api/genres')
                .set('x-auth-token', token) //set the header
                .send({ name }); // or send({ name: name }) in ES6
        }

        beforeEach(() => {
            token = new User().generateAuthToken();
            name = 'genre1';
        })

        it('should return 401 if client is not logged in', async () => {
            token = '';

            const res = await request(server).post('/api/genres').send({ name: 'genre1' });

            expect(res.status).toBe(401);
        });

        it('should return 400 if genre is less than 5 characters', async () => {
            name = '1234';

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if genre is more than 5 characters', async () => {

            name = new Array(52).join('a'); //generate an array of 51 elts

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should save the genre if it is valid', async () => {

            await exec();

            const genre = await Genre.find({ name: 'genre1' })

            expect(genre).not.toBeNull();
        });

        it('should return genre if it is valid', async () => {


            const res = await exec();

            const genre = await Genre.find({ name: 'genre1' })

            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', 'genre1');
        });
    });

});