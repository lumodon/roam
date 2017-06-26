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

module.exports = router
