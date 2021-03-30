const express = require('express')
const router = express.Router()
const models = require('../models')
const fetch = require('node-fetch')


// search the tracks, albums, etc
router.post('/search', (req, res) => {
    const search = req.body.searchtextbox
    console.log(search)
    fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${search}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "e118aa187bmsh51dce0dd58837e0p1bcfe5jsn469699bec0df",
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
        }
    }).then(response => {
        return response.json();
    }).then(response => {
        console.log(response)
            // res.json(response)
        res.render('search-results', { response: response.data });
    })
})




module.exports = router