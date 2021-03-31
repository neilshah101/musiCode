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
        res.render('display-posts', {posts: posts})
    })
})

router.get('/add-post', (req, res) => {
    const userId = req.session.userId
    const username = req.session.username

    if(username) {
        res.render('add-post')
    } else {
        res.redirect('/users/login')
    }
})

router.get('/my-posts', (req, res) => {
    const userId = req.session.userId
    const username = req.session.username

    models.Post.findAll({
        where: {
            userId: userId,
        }
    }).then(posts => {
        res.render('my-posts', {posts: posts, firstName: req.session.firstName})
})
})

router.post('/add-post', (req, res) => {
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
        res.redirect('/posts/display-posts')
    })
})

router.post('/delete-post', (req, res) => {
    const postId = req.body.postId

    models.Post.destroy({
        where: {
            id: postId
        }
    }).then(deletedPost => {
        res.json("deleted")
    })
})

router.post('/update-post', (req, res) => {

    const title = req.body.title
    const body = req.body.body
    const projectUrl = req.body.projectUrl
    const userId = req.session.userId

    models.Post.update({
        title: title, 
        body: body, 
        projectUrl: projectUrl,
        userId: userId,
    }, {
        where: {
            id: postId
        }
    }).then(updatedPost => {
        res.redirect('/posts/my-posts')
    })
})

module.exports = router