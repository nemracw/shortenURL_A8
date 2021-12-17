const mongoose = require('mongoose')
const Url = require('../url') // 載入 url model
mongoose.connect('mongodb://localhost/', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < 10; i++) {
    Url.create({ url: 'url-' + i })
  }
  console.log('done')
})

