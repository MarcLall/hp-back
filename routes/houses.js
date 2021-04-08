const express = require('express')
const connection = require('../src/config')

const router = express.Router()

router.get(`/`, (req, res) => {
  connection.query('SELECT * FROM houses', (err, results) => {
    if (err) {
      res.status(500).send(`Error retrieving data`)
    } else {
      res.status(200).json(results)
    }
  })
})

router.post(`/`, (req, res) => {
  connection.query('INSERT INTO houses SET ?', req.body, err => {
    if (err) {
      res.status(500).send(`Error saving data`)
    } else {
      res.status(200).send('success')
    }
  })
})

module.exports = router
