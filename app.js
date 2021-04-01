const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const path = require('path')
const bodyParser = require('body-parser')
const models = require('./models')
const { ensureAsync } = require('async')
const bcrypt = require('bcrypt')
const session = require('express-session')
const userRoutes = require('./routes/users')
const playlistRoutes = require('./routes/playlists')
const postRoutes = require('./routes/posts')
const searchRoutes = require('./routes/searches')
const authenticate = require('./authentication/auth')
const fetch = require('node-fetch')
require('dotenv').config()
const PORT = process.env.PORT || 8080

app.use("/styling",express.static("styling"))

const VIEWS_PATH = path.join(__dirname, '/views')


app.use(bodyParser.urlencoded({ extended: false }))

app.engine('mustache', mustacheExpress(VIEWS_PATH + '/partials', '.mustache'))
app.set('views', VIEWS_PATH)
app.set('view engine', 'mustache')

app.use(express.urlencoded())
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true
}))
app.use('/users', userRoutes)
app.use('/playlists', playlistRoutes)
app.use('/searches', searchRoutes)
app.use('/posts', postRoutes)

app.get('/', (req, res) => {
    console.log(req.session)
    res.render('index')
})


app.get('/template', (req, res) => {
    res.render('template')
})

app.listen(PORT, () => console.log("Server is running..."))