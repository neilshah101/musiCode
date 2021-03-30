const express = require('express')
const router = express.Router()
const models = require('../models')
const fetch = require('node-fetch')



router.post('/collection', (req, res) => {

    const userId = req.body.userid
    const songId = req.body.id
    const songTitle = req.body.title
    const artist = req.body.artistName
    const albumTitle = req.body.albumTitle
    const coverUrl = req.body.coverUrl
    const previewUrl = req.body.previewUrl


    let collection = models.Collection.build({
        userId: userId,
        songId: songId,
        songTitle: songTitle,
        artist: artist,
        albumTitle: albumTitle,
        coverUrl: coverUrl,
        previewUrl: previewUrl
    })

    collection.save().then((savedCollection) => {
        console.log(savedCollection)
        res.json({ message: 'track added to collection' })
    })

})












module.exports = router