const mongoose = require('mongoose')

const Url = require('../url') // 載入 url model

mongoose.connect('mongodb://localhost/urlShortener', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

