const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const port = 3000

const mongoose = require('mongoose')

const Url = require('./models/url')
const generatePath = require('./public/javascripts/generate_shortURL')
const host = 'www.localhost:3000/'


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

// app.post('/', (req, res) => {
//   const originalUrl = req.body.inputURL
//   const path = generatePath(5)
//   let shortUrl = host + path
//   return Url.create({ shortUrl , originalUrl })
//     .then(() => res.render('success', { shortUrl, originalUrl }) )
//     .catch(error => console.log(error))
// })

app.post('/shortened', (req, res) => {
  const targetURL = req.body.inputURL
  const shortUrl = host + generatePath(5)
  Url.findOne({ originalUrl: targetURL })
    .then(data =>
      data ? data : Url.create({ shortUrl, originalUrl: targetURL })
    )
    .then(data =>
      res.render("success", {
        originalUrl: req.body.inputURL,
        shortUrl: data.shortUrl,
      })
    )
    .catch(error => console.error(error))
})



app.get("")

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})