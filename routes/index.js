const express = require('express')
const router = express.Router()

router.get('/', (request, response) => {
  response.render('index')
})

router.get('/sign-in', (request, response) => {
  response.render('sign-in')
})

router.get('/sign-up', (request, response) => {
  response.render('sign-up')
})

router.get('/new-post', (request, response) => {
  response.render('new-post')
})

router.get('/post', (request, response) => {
  response.render('post')
})

router.get('/profile', (request, response) => {
  response.render('profile')
})

module.exports = router
