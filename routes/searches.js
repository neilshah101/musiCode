const express = require('express')
const router = express.Router()
const models = require('../models')
const fetch = require('node-fetch')
require('dotenv').config()

// search the tracks, albums, etc
router.post('/search', (req, res) => {
    const search = req.body.searchtextbox
    const userId = req.session.userId
        // console.log(userId)
    console.log(search)
    fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${search}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": process.env.API_KEY,
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
        }
    }).then(response => {
        return response.json();
    }).then(response => {
        res.render('search-results', { response: response.data, userId: userId, search: search });
    })
})


module.exports = router