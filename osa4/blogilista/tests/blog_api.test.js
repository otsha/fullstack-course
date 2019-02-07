const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const testHelper = require('../utils/test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.remove({})
    
    for (blog of testHelper.blogs) {
        const blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('blogs are returned as JSON', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('correct number of blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(6)
})

afterAll(() => {
    console.log("You're my wonderwall")
    mongoose.connection.close()
})