const express = require('express')
const router = express.Router()
const models = require('../models')
const fetch = require('node-fetch')

router.post('/delete-collection', (req, res) => {
    const collectionId = req.body.collectionId
    console.log(collectionId)

    models.Collection.destroy({
        where: {
            id: collectionId
        }
    }).then(deletedcollections => {
        res.redirect('/playlists/mycollection')
    })

})

router.get('/mycollection', (req, res) => {
    const userId = req.session.userId
    const username = req.session.username
    console.log(userId)

    if (userId) {
        models.Collection.findAll({
            where: {
                userId: userId
            }
        }).then(collections => {
            res.render('display-playlist', { collections: collections });
        })
    } else {
        res.redirect('/users/login')
    }

})

router.get('/mycollection/:firstName/:userId', (req, res) => {
    const userId = req.params.userId
    const username = req.session.username
    const firstName = req.params.firstName
        // console.log(userId)
    console.log(firstName)

    models.Collection.findAll({
        where: {
            userId: userId
        }
    }).then(collections => {
        res.render('display-playlist-2', { collections: collections, firstName: firstName });
    })

})


router.post('/collection', (req, res) => {

    const userId = req.session.userId
    const songId = req.body.id
    const songTitle = req.body.title
    const artist = req.body.artistName
    const albumTitle = req.body.albumTitle
    const coverUrl = req.body.coverUrl
    const previewUrl = req.body.previewUrl
    const firstName = req.session.firstName

    if (userId) {
        let collection = models.Collection.build({
            userId: userId,
            songId: songId,
            songTitle: songTitle,
            artist: artist,
            albumTitle: albumTitle,
            coverUrl: coverUrl,
            previewUrl: previewUrl,
            firstName: firstName,
        })

        collection.save().then((savedCollection) => {
            console.log(savedCollection)
            res.redirect('/playlists/mycollection');
        })
    } else {
        res.redirect('/users/login')
    }


})












module.exports = router