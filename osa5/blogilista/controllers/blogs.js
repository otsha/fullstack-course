const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('users', { username: 1, id: 1 })
    response.json(blogs.map(b => b.toJSON()))
})

blogRouter.post('/', async (request, response, next) => {
    try {
        const decoded = jwt.verify(request.token, process.env.SECRET)
        if (!request.token || !decoded.id) {
            return response.status(401).json({ error: "Invalid token" }).end()
        }

        const blog = new Blog(request.body)
        const user = await User.findById(decoded.id)
        blog.user = user;

        const result = await blog.save()

        user.blogs = user.blogs.concat(result.id)
        await user.save()

        response.status(201).json(result)
    } catch (exception) {
        response.status(400)
        next(exception)
    }
})

blogRouter.delete('/:id', async (request, response, next) => {
    console.log(request.params)
    console.log(request.headers)
    console.log(request.headers.authorization)

    try {
        const decoded = jwt.verify(request.token, process.env.SECRET)
        if (!request.token || !decoded.id) {
            return response.status(401).json({ error: "Invalid token" }).end()
        }

        const blog = await Blog.findById(request.params.id)

        if (blog.user.toString() === decoded.id) {
            await Blog.findByIdAndDelete(request.params.id)
            response.status(204).end()
        } else {
            response.status(401).json({ error: "Unauthorized: Only the creator of an entry can delete it" }).end()
        }

    } catch (exception) {
        response.status(400).json({ error: "Token must be provided"})
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