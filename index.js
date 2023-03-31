require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const {response} = require("express");
const app = express()

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))


app.get('/', (req, res) => {
  res.send('<h1>Phonebook backend</h1>')
})


app.get('/info', (req, res) => {
  res.send(`
    <p>Phonebook  has info for ${persons.length} pepople</p>
    <p>${new Date()}</p>
  `)
})


app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})


app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then(person => {
    res.json(person)
  })
})


app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndDelete(req.params.id).then(person => {
    res.json(person)
  })

})

app.put('/api/persons/:id', (req, res) => {
  Person.findByIdAndUpdate(req.params.id, req.body, {new: true}).then(updatedPerson => res.json(updatedPerson))
})


app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({
      error: 'missing name.'
    })
  }

  if (!body.number) {
    return res.status(400).json({
      error: 'missing number.'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    res.json(savedPerson)
  })
})


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})