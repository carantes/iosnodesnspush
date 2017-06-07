//  importando dependencias
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

//  aplicando middlewares
app.use(bodyParser.urlencoded({ limit: '2mb', extended: false }))
app.use(bodyParser.json({ limit: '2mb' }))

module.exports = app