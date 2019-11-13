const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const port = process.env.PORT || 80

const router = require('./routes/index')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(logger('dev'))
app.use(cors())
app.use(cookieParser())

router(app)


try {
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório"
  app.listen(port)
  console.log(`Online on port ${port}`)
} catch (error) {
  console.error(error)
}

module.exports = app
