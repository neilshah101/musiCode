const express = require('express')
const router = express.Router()
const models = require('../models')
const fetch = require('node-fetch')


// search the tracks, albums, etc
router.post('/search', (req, res) => {
    const search = req.body.searchtextbox
    const userId = req.session.userId
    console.log(userId)
    console.log(search)
    fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${search}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "01eee2a29dmsh1db73f5426295c4p168ec1jsnb160ddf72ea8",
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
        }
    }).then(response => {
        return response.json();
    }).then(response => {
        res.render('search-results', { response: response.data, userId: userId, search: search });
    })
})


module.exports = router