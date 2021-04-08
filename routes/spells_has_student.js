const express = require('express')
const connection = require('../src/config')

const router = express.Router()

router.get(`/`, (req, res) => {
  connection.query('SELECT * FROM spells_has_student', (err, results) => {
    if (err) {
      res.status(500).send(`Error retrieving data`)
    } else {
      res.status(200).json(results)
    }
  })
})

router.post(`/`, (req, res) => {
  const { student_id, spells_id } = req.body
  connection.query(
    'INSERT INTO spells_has_student (`student_id`, `spells_id`) VALUES (?,?)',
    [student_id, spells_id],
    err => {
      if (err) {
        res.status(500).send('Error saving studSpell')
      } else {
        res.status(200).send('studSpell match ok')
      }
    }
  )
})

router.delete('/:id', (req, res) => {
  connection.query(
    'DELETE FROM spells_has_student WHERE id=?',
    req.params.id,
    err => {
      if (err) {
        res.status(500).send('Error deleting student')
      } else {
        res.status(200).send('Deleting ok')
      }
    }
  )
})

router.put('/:id', (req, res) => {
  const { student_id, spells_id } = req.body
  connection.query(
    'UPDATE `hp`.`spells_has_student` SET `student_id` = ?, `spells_id` = ? WHERE (`id` = ?)',
    [student_id, spells_id, req.params.id],
    err => {
      if (err) {
        res.status(500).send('Error updated student')
      } else {
        res.status(200).send('update ok')
      }
    }
  )
})

module.exports = router
