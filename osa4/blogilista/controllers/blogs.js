const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request.body)

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
        const result = await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } catch (exception) {
        response.status(400)
        next(exception)
    }
})

module.exports = blogRouter