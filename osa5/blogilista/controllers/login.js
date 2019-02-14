const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (user) {
            const passwordCorrect = user === null
                ? false
                : await bcrypt.compare(req.body.password, user.passwordHash)

            if (!(user && passwordCorrect)) {
                return res.status(401).json({ error: "Invalid password" }).end()
            }

            const token = jwt.sign({ 
                username: user.username, 
                id: user.id 
            }, process.env.SECRET)

            res.status(200).send({ token, username: user.username, name: user.name, id: user.id })
        } else {
            res.status(404).json({ error: 'Invalid username' }).end()
        }
    } catch (exception) {
        res.status(500).json({ error: exception.message }).end()
    }
})

module.exports = loginRouter