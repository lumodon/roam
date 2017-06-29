require('dotenv').config({path: './config/.env'})

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24

const express = require('express')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const path = require('path')
const port = process.env.PORT || 3000
const app = express()
const flash = require('connect-flash')

const passport = require('passport')
const session = require('express-session')

app.use(express.static(path.join(__dirname, 'public')))
app.use(favicon(path.join(__dirname, 'public', 'images', 'maps.ico')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET || "blah",
  resave: true,
  saveUninitialized: false,
  expires: Date.now() * MILLISECONDS_PER_DAY * 30
}))

app.use(passport.initialize())
app.use(passport.session())

require('./config/auth')(passport)

const user = require('./routes/user')(passport)
const post = require('./routes/post')

app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', user)
app.use('/', post)

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`)
})