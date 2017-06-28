const express = require('express')
const router = express.Router()
const { authorization } = require('./auth')

module.exports = (passport) => {

  router.get('/', (request, response) => {
    response.render('index')
  })

  router.post('/sign-in', passport.authenticate('local-login', {
      successRedirect: '/',
      failureRedirect: '/sign-in'
    })
  )

  router.get('/sign-in', (request, response) => {
    response.render('sign-in')
  })

  router.get('/sign-up', (request, response) => {
    response.render('sign-up')
  })

  router.get('/sign-out', (request, response) => {
    request.logout() // Look up?
    request.session = null
    let cookie = request.cookies
    for (let prop in cookie) {
      response.cookie(prop, '', {expires: new Date(0)})
    }
    response.redirect('/')
  })

  router.get('/new-post', (request, response) => {
    response.render('new-post')
  })

  router.post('/sign-up', (request, response) => {
    User.addUser(request.body.email, request.body.password, rows => {
      console.log('result rows', rows)
      // response.render('index')
      response.send(rows)
    })
  })

  return router
}