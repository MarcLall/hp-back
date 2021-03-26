const express = require('express')
const connection = require('../src/config')

const router = express.Router()

router.post('/', (req, res) => {
  connection.query('INSERT INTO student SET ?', req.body, err => {
    if (err) {
      res.status(500).send('Error saving student')
    } else {
      res.status(200).send('Student inserted into the base')
    }
  })
})

router.get('/', (req, res) => {
  connection.query('SELECT * from student', (err, results) => {
    if (err) {
      res.status(500).send('Error find student')
    } else {
      res.status(200).json(results)
    }
  })
})

router.get('/:id', (req, res) => {
  connection.query(
    'SELECT * from student WHERE id = ?',
    [req.params.id],
    (err, results) => {
      if (err) {
        res.status(500).send('Error saving student')
      } else {
        res.status(200).json(results)
      }
    }
  )
})

router.put('/:id', (req, res) => {
  const idStudent = req.params.id
  const newStudent = req.body
  return connection.query(
    'UPDATE student SET ? WHERE id= ?',
    [newStudent, idStudent],
    (err, results) => {
      if (err) {
        res.status(500).send('Error saving student')
      } else {
        res.status(200).json(results)
      }
    }
  )
})

router.delete('/:id', (req, res) => {
  const idStudent = req.params.id
  connection.query(
    'DELETE FROM student WHERE id= ?',
    [idStudent],
    (err, results) => {
      if (err) {
        res.status(500).send('Error deleting student')
      } else {
        res.status(200).json(results)
      }
    }
  )
})

module.exports = router
