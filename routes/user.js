const express = require('express')
const router = express.Router()
const { authorization } = require('./auth')

module.exports = (passport) => {

  router.get('/', (request, response) => {
    console.log('request', request.user)
    response.render('index', {user: request.user })
  })

  router.post('/sign-in', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/sign-in'
  }))

  router.get('/sign-in', (request, response) => {
    if(request.user) {
      response.redirect('/')
    } else {
      response.render('sign-in', {user: request.user })
    }
  })

  router.get('/sign-up', (request, response) => {
    if(request.user) {
      response.redirect('/')
    } else {
      response.render('sign-up', {user: request.user })
    }
  })

  router.get('/sign-out', (request, response) => {
    request.session.destroy((result) => {
      response.redirect('/')
    })
  })

  router.get('/new-post', (request, response) => {
    response.render('new-post', {user: request.user })
  })

  router.post('/sign-up', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/sign-up'
  }))

  return router
}
