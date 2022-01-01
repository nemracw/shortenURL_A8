const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const port = 3000

const mongoose = require('mongoose')

const Url = require('./models/url')
const generatePath = require('./public/javascripts/generate_shortURL')
const host = 'www.localhost:3000/urlShortener/'


app.use(express.static('public')) // setting static files
app.use(express.urlencoded({ extended: true })) // setting body-parser

mongoose.connect('mongodb://localhost/urlShortener', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

// handlebars settings
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/urlShortener', (req, res) => {
  const originalUrl = req.body.inputURL
  const path = generatePath(5)
  let shortUrl = host + path
  return Url.create({ shortUrl, originalUrl })
    .then(() => res.render('success', { shortUrl, originalUrl }) )
    .catch(error => console.log(error))
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})