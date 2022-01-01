const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override') 
const port = 3000

const routes = require('./routes/router')
require('./config/mongoose')
const app = express()

// handlebars settings
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public')) // setting static files
app.use(express.urlencoded({ extended: true })) // setting body-parser
app.use(methodOverride('_method'))

app.use(routes)

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})