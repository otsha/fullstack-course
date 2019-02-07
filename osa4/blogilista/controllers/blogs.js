const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getToken = request => {
    const auth = request.get('authorization')
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
        return auth.substring(7)
    }

    return null
}

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('users', { username: 1, id: 1 })
    response.json(blogs.map(b => b.toJSON()))
})

blogRouter.post('/', async (request, response, next) => {
    const token = getToken(request)

    try {
        const decoded = jwt.verify(token, process.env.SECRET)
        if (!token || !decoded.id) {
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
    const token = getToken(request)

    try {
        const decoded = jwt.verify(token, process.env.SECRET)
        if (!token || !decoded.id) {
            return response.status(401).json({ error: "Invalid token" }).end()
        }

        const blog = await Blog.findById(request.params.id)
        const user = await User.findById(decoded.id)

        if (blog.user.toString() === user.id.toString()) {
            await Blog.findByIdAndDelete(request.params.id)
            response.status(204).end()
        } else {
            response.status(401).json({ error: "Unauthorized" }).end()
        }

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