require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const index = require('./routes/index')
const port = process.env.PORT || 3000

const app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.json())
bodyParser.urlencoded({ extended: false })

app.use(express.static('/public'))
app.use('/', index)

app.listen(port)
