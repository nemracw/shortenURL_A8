const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Url = require('./models/url')
const generatePath = require('./public/javascripts/generate_shortURL')
const host = 'www.localhost:3000/urlShortener/'

// setting static files
app.use(express.static('public'))

// setting body-parser
app.use(express.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost/urlShortener', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/urlShortener', (req, res) => {
  const originalUrl =req.body.inputURL
  const path = generatePath(originalUrl)
  let shortUrl = host + path
  res.render('success', { shortUrl ,  originalUrl })
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})