const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const connection = require('./config')
const routes = require('../routes/index')
const port = 4242

const app = express()

app.use(cors('*'))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connection.connect(err => {
  if (err) {
    console.error('error connecting: ' + err.stack)
    return
  }
  console.log('connected as id ' + connection.threadId)
})
app.use('/houses', routes.houses)
app.use('/students', routes.students)
app.listen(port, err => {
  if (err) {
    console.log('chicken is fried')
  }
  console.log('chicken is alive')
})
