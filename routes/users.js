const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const models = require('../models')
const SALT_ROUNDS = 10
const authenticate = require('../authentication/auth')

router.get('/register', (req, res) => {
    res.render('register')
})


router.post('/register', async (req, res) => {

    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let username = req.body.username
    let password = req.body.password

    let persistedUser = await models.User.findOne({
        where: {
            username: username
        }
    })

    if (persistedUser == null) {

        bcrypt.hash(password, SALT_ROUNDS, async(error, hash) => {
            if (error) {
                res.render('/register', { message: 'Error registering user!' })
            } else {
                let user = models.User.build({

                    firstName: firstName,
                    lastName: lastName,
                    username: username,
                    password: hash
                })

                let savedUser = await user.save()
                if (savedUser != null) {
                    res.redirect('/users/login')
                } else {
                    res.render('/users/register', { message: "User already exists!" })
                }
            }
        })

    } else {
        res.render('/users/register', { message: "User already exists!" })
    }
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', async(req, res) => {

    let username = req.body.username
    let password = req.body.password

    let user = await models.User.findOne({
        where: {
            username: username
        }
    })
    if (user != null) {
        bcrypt.compare(password, user.password, (error, result) => {
            if (result) {
                if (req.session) {
                    console.log(req.session)
                    req.session.user = { userId: user.id }
                    console.log(req.session)
                    res.redirect('/')
                }
            } else {
                res.render('login', { message: "Incorrect username or password" })
            }
        })
    } else {
        res.render('login', { message: "Incorrect username or password" })
    }
})


module.exports = router