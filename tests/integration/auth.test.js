
const { User } = require('../../models/user');
const { Genre } = require('../../models/genre');
const request = require('supertest');

describe('auth middleware', () => {

    beforeEach(() => { server = require('../../index'); }) //listening on port 3000
    afterEach(async () => {
        await Genre.remove({});
        server.close();
    }); // close the server on port 3000 to allow other tests to reun successfully.

    let token;

    const exec = () => {
        return request(server)
            .post('/api/genres')
            .set('x-auth-token', token)
            .send({ name: 'genre1' });
    }

    beforeEach(() => {
        token = new User().generateAuthToken();
    });

    it('should  return 401 if no token is provided', async () => {
        token = ' ';

        const res = await exec();

        expect(res.status).toBe(401);
    });

    it('should  return 400 if no token is invalid', async () => {
        token = 'a';

        const res = await exec();

        expect(res.status).toBe(401);
    });

    it('should  return 200 if token is valid', async () => {

        const res = await exec();

        expect(res.status).toBe(200);
    })
})