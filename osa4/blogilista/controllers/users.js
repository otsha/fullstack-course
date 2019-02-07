const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.post('/', async (req, res, next) => {
    try {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(req.body.password, saltRounds)

        const user = new User({
            username: req.body.username,
            name: req.body.name,
            passwordHash
        })

        const result = await user.save()
        res.status(201).json(result)
    } catch (exception) {
        res.status(400)
        next(exception)
    }
})

userRouter.get('/', async (req, res, next) => {
    const users = await User.find({})
    res.json(users)
})

module.exports = userRouter