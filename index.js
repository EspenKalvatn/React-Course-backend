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


app.get('/api/persons', (req, res,next) => {
  Person.find({})
    .then(persons => {
      res.json(persons)
    })
    .catch(error => next(error))
})


app.get('/api/persons/:id', (req, res,next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        console.log('Person with id not found')
        res.status(404).end()
      }
    })
    .catch(error => {
      next(error)
    })
})


app.delete('/api/persons/:id', (req, res,next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})


app.put('/api/persons/:id', (req, res,next) => {
  Person.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})


app.post('/api/persons', (req, res,next) => {
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

  person.save()
    .then(savedPerson => {
      res.json(savedPerson)
    })
    .catch(error => next(error))
})


const errorHandler = (error, req, res, next) => {
  console.log(error)
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({error: error.message})
  }
  next(error)
}


// handler of requests with result to errors
app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})