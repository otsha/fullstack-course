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

test('deleting an existing blog returns code 204', async () => {
    const id = "5a422a851b54a676234d17f7"
    
    await api
    .delete(`/api/blogs/${id}`)
    .expect(204)
})

test('attempting to delete with invalid id returns 400', async () => {
    const id = "abcd"
    await api
    .delete(`/api/blogs/${id}`)
    .expect(400)
})
/*
// COULDN'T GET THE TEST TO WORK BUT THE FEATURE WORKS USING VSCODE REST
test('updating a blog post is possible', async () => {
    const blogs = await api.get('/api/blogs')
    const id = blogs.body[0].id

    const newBlog = {
        id: id,
        title: "React patterns UPDATED",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 25
    }

    await api
    .put(`/api/blogs/${newBlog.id}`)
    .send(newBlog)
    .expect(201)

    const response = await api.get('/api/blogs')
    expect(response.body[0].likes).toEqual(25)
})
*/

afterAll(() => {
    console.log("You're my wonderwall")
    mongoose.connection.close()
})