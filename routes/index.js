const express = require('express')
const router = express.Router()
const { User } = require('../db')

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

router.post('/sign-up', (request, response) => {
  User.addUser(request.body.email, request.body.password, rows => {
    console.log('result rows', rows)
    // response.render('index')
    response.send(rows)
  })
})

module.exports = router

