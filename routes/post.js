const express = require('express')
const router = express.Router()
const { authorization } = require('./auth')

module.exports = (passport) => {

  router.get('/new-post', authorization, (request, response) => {
    response.render('new-post')
  })

  router.get('/post', authorization, (request, response) => {
    response.render('post')
  })

  return router
}