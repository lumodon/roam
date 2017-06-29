const LocalStrategy = require('passport-local').Strategy
const User = require('../db/models/user')
const bcrypt = require('bcrypt')

module.exports = (passport) => {

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser( (id, done) => {
    User.findById(id, userData => {
      console.log('userdata has:', userData)
      done(null, userData) // TODO: Remove password from deserialized info
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
}