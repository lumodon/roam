const express = require('express')
const router = express.Router()
const { authorization } = require('./auth')

module.exports = (passport) => {

  router.get('/', (request, response) => {
    response.render('index', {user: request.user, message: request.flash('loginMessage', ) })
  })

  router.route('/sign-in')
  .get((request, response) => {
    if(request.user) {
      response.redirect('/')
    } else {
      response.render('sign-in', {user: request.user, message: request.flash('loginMessage', ) })
    }
  })
  .post(passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/sign-in',
    failureFlash: true
  }))


  router.route('/sign-up')
  .get((request, response) => {
    if(request.user) {
      response.redirect('/')
    } else {
      response.render('sign-up', {user: request.user, message: request.flash('loginMessage', ) })
    }
  })
  .post(passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/sign-up',
    failureFlash: true
  }))

  router.get('/sign-out', (request, response) => {
    request.session.destroy((result) => {
      response.redirect('/')
    })
  })

  router.get('/new-post', (request, response) => {
    response.render('new-post', {user: request.user, message: request.flash('loginMessage', ) })
  })


  return router
}
