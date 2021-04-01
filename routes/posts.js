const express = require('express')
const router = express.Router()
const models = require('../models')
const mustacheExpress = require('mustache-express')
const { Op } = require('sequelize')
const session = require('express-session')
const user = require('../models/user')

router.use(session({
    secret: 'somesecret',
    resave: false,
    saveUninitialized: true
}))


router.get('/display-posts', (req, res) => {
    models.Post.findAll({})
        .then(posts => {
            res.render('display-posts', { posts: posts, firstName: req.session.firstName, username: req.session.username })
        })
})

router.get('/add-post', (req, res) => {
    const userId = req.session.userId
    const username = req.session.username

    if (username) {
        res.render('add-post')
    } else {
        res.redirect('/users/login')
    }
})

router.get('/my-posts', (req, res) => {
    const userId = req.session.userId
    const username = req.session.username

    if (username) {
        models.Post.findAll({
            where: {
                userId: userId,
            }
        }).then(posts => {
            res.render('my-posts', { posts: posts, firstName: req.session.firstName, username: req.session.username, lastName: req.session.lastName })
        })
    } else {
        res.redirect('/users/login')
    }
})

router.post('/add-post', (req, res) => {
    const title = req.body.title
    const body = req.body.body
    const projectUrl = req.body.projectUrl
    const userId = req.session.userId
    const firstName = req.session.firstName
    const username = req.session.username
    const lastName = req.session.lastName

    let post = models.Post.build({
        title: title,
        body: body,
        projectUrl: projectUrl,
        userId: userId,
        firstName: firstName,
        username: username,
        lastName: lastName,
    })

    post.save().then((savedPost) => {
        console.log(savedPost)
        res.redirect('/users/dashboard')
    })
})

router.post('/delete-post', (req, res) => {
    const postId = req.body.postId

    models.Post.destroy({
        where: {
            id: postId
        }
    }).then(deletedPost => {
        res.redirect('/posts/my-posts')
    })
})

router.get('/update-post/:postId', (req, res) => {
    const postId = req.params.postId
    console.log(req.session)
    models.Post.findOne({
        where: {
            id: postId
        }
    }).then(post => {
        res.render('update-post', { post: post })
    })
})

router.post('/update-post/:postId', (req, res) => {

    const title = req.body.title
    const body = req.body.body
    const projectUrl = req.body.projectUrl
    const userId = req.session.userId
    const postId = req.params.postId

    models.Post.update({
        title: title,
        body: body,
        projectUrl: projectUrl,
    }, {
        where: {
            id: postId
        }
    }).then(updatedPost => {
        res.redirect('/posts/my-posts')
    })
})

module.exports = router