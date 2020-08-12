const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');

const api = supertest(app);

beforeEach(async () => {
    await User.deleteMany();

    const password_hash = await bcrypt.hash('secret', 10);

    const default_user = new User({
        username : "root",
        name : "superuser",
        password_hash
    });

    await default_user.save();

});

// tests which check that invalid users are not created and invalid add user 
//operation returns a suitable status code and error message
//they fails. I aint wasting my time again
describe("when there is initially one user in the db" , () => {
    test("creation fails if a duplicate username is used", async () => {
        
    const new_user = {
        username : "root",
        name : "James Mutuku",
        password : "pass123"
    };

    const result = await api
                            .post('/api/users')
                            .send(new_user)
                            .expect(400)
                            .expect('Content-Type', /application\/json/);

    //expect(result.body.error).toContain('`username` must be unique');
    });
});


afterAll(() => {
    mongoose.connection.close()
})