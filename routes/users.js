const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const models = require('../models')
const SALT_ROUNDS = 10
const authenticate = require('../authentication/auth')

router.get('/dashboard', authenticate, (req, res) => {

    models.Post.findAll({})
        .then(posts => {
            res.render('dashboard', { posts: posts, firstName: req.session.firstName, username: req.session.username })
        })

    router.post('/dashboard', authenticate, (req, res) => {
        const title = req.body.title
        const body = req.body.body
        const projectUrl = req.body.projectUrl
        const userId = req.session.userId

        let post = models.Post.build({
            title: title,
            body: body,
            projectUrl: projectUrl,
            userId: userId,
        })

        post.save().then((savedPost) => {
            console.log(savedPost)
            res.redirect('/users/dashboard')
        })

    })
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', async(req, res) => {

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
        res.render('login', { message: "User already exists!" })
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
                    req.session.userId = user.id
                    req.session.username = user.username
                    req.session.firstName = user.firstName
                    req.session.lastName = user.lastName
                    console.log(req.session)
                    res.redirect('/users/dashboard')
                }
            } else {
                res.render('login', { message: "Incorrect username or password" })
            }
        })
    } else {
        res.render('login', { message: "Incorrect username or password" })
    }
})


router.get('/logout', function(req, res, next) {


    req.session.destroy(err => {
        console.log(err);
    })

    res.redirect('/');
});


module.exports = router