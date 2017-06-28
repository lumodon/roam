require('dotenv').config()

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24

const express = require('express')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const path = require('path')
const port = process.env.PORT || 3000
const app = express()
const User = require('./db/models/user')

// Passport

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')

app.use(express.static('public'))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false, // Ask Punit
  expires: Date.now() * MILLISECONDS_PER_DAY * 30
}))

app.use(passport.initialize()) // look me up
app.use(passport.session()) // look me up

passport.serializeUser((user, done) => {
  done(null, user.id)
})

// Where is info being sent to and from?
// Where does done send the info? why user.id and not just user?
// Where does deserialize send it's "done" info? why does it send the entire DB response?

passport.deserializeUser( (id, done) => {
  User.findById(id, userData => {
    done(null, userData)
  })
})

passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
  session: true
}, (request, email, password, done) => {
  User.findByEmail(email, userData => {
    if(userData) {

      // Why don't I need this? Where is "request.user" getting 
      // created if this chunk of code isn't neccesary?

      // request.session.user = {
      //   userId: userData.id,
      //   userEmail: userData.email,
      //   userJoinDate: userData.timestamp
      // }

      done(null, userData)
    } else {
      done(null, false, {message: 'No user found.'})
    }
  })
}))

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
  session: true
}, (request, email, password, done) => {
  process.nextTick(() => { // Ask Punit - how much do we need to know?
    User.findByEmail(email, userData => {
      if(userData) {
        done(null, false, {message: 'Email already exists'})
      } else {
        User.addUser(email, password, result => {
          done(null, result)
        })
      }
    })
  })
}))

const user = require('./routes/user')(passport)
const post = require('./routes/post')

app.use(favicon(path.join(__dirname, 'public', 'images', 'maps.ico')))
app.set('view engine', 'ejs')


app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', user)
app.use('/', post)

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`)
})
