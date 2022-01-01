// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const Url = require('../models/url')
const generatePath = require('../public/javascripts/generate_shortURL')
const host = 'www.localhost:3000/'

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/shortened', (req, res) => {
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

router.get('/:shortUrl', (req, res) => {
  const shortUrl = host + req.params.shortUrl

  Url.findOne({ shortUrl })
    .then(data => {
      if (!data) {
        return res.render("error", {
          errorMsg: "Cannot found the URL",
          errorURL: shortUrl,
        })
      }
      res.redirect(data.originalUrl)
    })
    .catch(error => console.error(error))
})


module.exports = router
