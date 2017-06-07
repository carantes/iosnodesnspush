const express = require('express')
const router = express.Router()
const sns = require('./sns.js')

//  Headers

//  APIs
router.get('/', (req, res, next) => {
  res.status(200).json({
    message: `Node Backend is alive`
  })
})

router.get('/subscribe', sns.subscribe.bind(sns))
router.get('/push', sns.push.bind(sns))

//  Not found
router.use((req, res, next) => {
  const err = new Error('Route Not found')
  err.status = '404'
  next(err)
})

module.exports = router
