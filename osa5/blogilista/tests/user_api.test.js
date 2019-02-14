const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const testHelper = require('../utils/test_helper')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
    await User.remove({})
    
    for (user of testHelper.users) {
        const userObject = new User(user)
        await userObject.save()
    }
})

test('user with invalid username length cannot be created', async () => {
    const user = {
        username: "Hi",
        name: "Hello",
        password: "testi"
    }

    await api
    .post('/api/users')
    .send(user)
    .expect(400)
})

test('user with invalid password length cannot be created', async () => {
    const user = {
        username: "Hello",
        name: "Hello",
        password: "hi"
    }

    await api
    .post('/api/users')
    .send(user)
    .expect(400)
})

afterAll(() => {
    console.log("You're my wonderwall")
    mongoose.connection.close()
})