const express = require('express')
const router = express.Router()
const models = require('../models')
const mustacheExpress = require('mustache-express')
const { Op } = require('sequelize')
const session = require('express-session')
const user = require('../models/user')

router.use(session({
    secret: 'somesecret',
    resave: true,
    saveUninitialized: false
}))


router.get('/posts', (req, res) => {
    models.Post.findAll({})
    .then(posts => {
        res.render('add-post', {posts: posts})
    })
})

router.post('/add-post', (req, res) => {
    const title = req.body.title
    const body = req.body.body
    const projectUrl = req.body.projectUrl
    const userId = req.body.userId
    

    let post = models.Post.build({
        title: title, 
        body: body, 
        projectUrl: projectUrl,
        userId: userId,
    })


    post.save().then((savedPost) => {
        console.log(savedPost)
        res.redirect('/add-post')
    })
})

router.post('/delete-post', (req, res) => {
    const postId = req.body.postId

    models.Post.destroy({
        where: {
            id: postId
        }
    }).then(deletedPost => {
        res.redirect('/posts')
    })
})

module.exports = router