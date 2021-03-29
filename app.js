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

app.use("/Main_sources",express.static("Main_sources"))

const PORT = 3000
const VIEWS_PATH = path.join(__dirname, '/views')

app.use(session({
    secret: 'somesecret',
    resave: true,
    saveUninitialized: false
}))

app.use(bodyParser.urlencoded({ extended: false }))

app.engine('mustache', mustacheExpress(VIEWS_PATH + '/partials', '.mustache'))
app.set('views', VIEWS_PATH)
app.set('view engine', 'mustache')
app.use('/users', userRoutes)
app.use('/playlists', playlistRoutes)
app.use('/searches', searchRoutes)
app.use('/posts', postRoutes)

app.get('/template', (req, res) => {
    res.render('template')
})

app.listen(PORT, () => console.log("Server is running..."))