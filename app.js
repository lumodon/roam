require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const index = require('./routes/index')
const favicon = require('serve-favicon')
const path = require('path')
const port = process.env.PORT || 3000

const app = express()

app.use(favicon(path.join(__dirname, 'public', 'images', 'maps.ico')))

app.set('view engine', 'ejs')


app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static('/public'))
app.use('/', index)

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`)
})
