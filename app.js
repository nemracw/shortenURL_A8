const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override') 
const port = 3000

const routes = require('./routes/router')
const app = express()

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/urlShortener', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

app.use(express.static('public')) // setting static files
app.use(express.urlencoded({ extended: true })) // setting body-parser

// handlebars settings
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(methodOverride('_method'))
app.use(routes)



app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})