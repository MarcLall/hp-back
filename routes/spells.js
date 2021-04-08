const express = require('express')
const connection = require('../src/config')

const router = express.Router()

router.get(`/`, (req, res) => {
  connection.query('SELECT * FROM spells', (err, results) => {
    if (err) {
      res.status(500).send(`Error retrieving data`)
    } else {
      res.status(200).json(results)
    }
  })
})

router.get(`/:id`, (req, res) => {
  const mySql = `SELECT * FROM spells WHERE id = ?`
  const idSpell = req.params.id
  connection.query(mySql, idSpell, (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving id from spells ')
    } else {
      res.status(200).json(results)
    }
  })
})

router.post('/', (req, res) => {
  connection.query('INSERT INTO spells SET ?', req.body, err => {
    if (err) {
      res.status(500).send('Error spell not created')
    } else {
      res.status(200).send('Spell created')
    }
  })
})

router.put('/:id', (req, res) => {
  const idSpells = req.params.id
  const newSpells = req.body
  connection.query(
    'UPDATE spells SET ? WHERE id = ?',
    [newSpells, idSpells],
    err => {
      if (err) {
        res.status(500).send('Error updated spells')
      } else {
        res.status(200).send('Spells modified')
      }
    }
  )
})

module.exports = router
