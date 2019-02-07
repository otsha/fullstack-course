const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog
    .find({}).populate('users', { username: 1, id: 1 })
    response.json(blogs.map(b => b.toJSON()))
})

blogRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request.body)
    const user = User.find({})[0]
    blog.user = user;

    try {
        const result = await blog.save()
        response.status(201).json(result)
    } catch (exception) {
        response.status(400)
        next(exception)
    }
})

blogRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } catch (exception) {
        response.status(400)
        next(exception)
    }
})

blogRouter.put('/:id', async (request, response, next) => {
    const blog = {
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes
    }

    try {
        await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        response.status(201).end()
    } catch (exception) {
        response.status(400)
        next(exception)
    }
})

module.exports = blogRouter