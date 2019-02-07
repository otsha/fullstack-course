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

test('indentifying field should be called id', async () => {
    const response = await api.get('/api/blogs')
    for(blog of response.body) {
        expect(blog.id).toBeDefined()
    }
})

test('new blog post increments the number of blogs', async () => {
    const newBlog = {
        title: "Hello World",
        author: "Matti Meikäläinen",
        url: "test.url",
        likes: 3,
    }

    const newBlogObject = new Blog(newBlog)
    await newBlogObject.save()

    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(7)
})

test('new blog post is saved correctly', async () => {
    const newBlog = {
        title: "Hello World",
        author: "Matti Meikäläinen",
        url: "test.url",
        likes: 3,
    }

    const newBlogObject = new Blog(newBlog)
    await newBlogObject.save()

    const response = await api.get('/api/blogs')
    expect(response.body[6].title).toEqual("Hello World")
    expect(response.body[6].author).toEqual("Matti Meikäläinen")
    expect(response.body[6].url).toEqual("test.url")
    expect(response.body[6].likes).toEqual(3)
})

test('posting a blog without defining likes results in 0 likes', async () => {
    const newBlog = {
        title: "Hello World",
        author: "Matti Meikäläinen",
        url: "test.url",
    }

    const newBlogObject = new Blog(newBlog)
    await newBlogObject.save()

    const response = await api.get('/api/blogs')
    expect(response.body[6].likes).toEqual(0)
})

test('posting a blog with empty title or url returns code 400', async () => {
    const newBlog = {
        url: "test.url"
    }

    const newBlogObject = new Blog(newBlog)
    //await newBlogObject.save()
    await api
    .post('/api/blogs')
    .send(newBlogObject)
    .expect(400)
})

afterAll(() => {
    console.log("You're my wonderwall")
    mongoose.connection.close()
})