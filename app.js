require('dotenv').config()

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24

const express = require('express')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const path = require('path')
const port = process.env.PORT || 3000
const app = express()
const User = require('./db/models/user')
const bcrypt = require('bcrypt')
const flash = require('connect-flash')

// Passport
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')

app.use(flash())
app.use(express.static('public'))
app.use(session({
  secret: process.env.SESSION_SECRET || "blah",
  resave: true,
  saveUninitialized: false, // Ask Punit
  expires: Date.now() * MILLISECONDS_PER_DAY * 30
}))

app.use(passport.initialize())
app.use(passport.session())

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
      bcrypt.compare(password, userData.password, (err, result) => {
        if(result) {
          done(null, userData)
        } else {
          done(null, false, request.flash('loginMessage', 'Wrong Password! Try brute-forcing some more.'))
        }
      })
    } else {
      done(null, false, request.flash('loginMessage', 'No user found.'))
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
        done(null, false, request.flash('message', 'Email already exists'))
      } else {
        bcrypt.hash(password, process.env.SALT, (err, hash) => {
          User.addUser(email, hash, result => {
            done(null, result)
          })
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
