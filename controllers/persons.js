const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/info', async (req, res) => {
  const n_people = await Person.countDocuments()

  res.send(`
    <p>Phonebook  has info for ${n_people} pepople</p>
    <p>${new Date()}</p>
  `)
})

personsRouter.get('/', (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.json(persons)
    })
    .catch((error) => next(error))
})

personsRouter.get('/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person)
      } else {
        console.log('Person with id not found')
        res.status(404).end()
      }
    })
    .catch((error) => {
      next(error)
    })
})

personsRouter.delete('/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

personsRouter.put('/:id', (req, res, next) => {
  Person.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedPerson) => {
      res.json(updatedPerson)
    })
    .catch((error) => next(error))
})

personsRouter.post('/', (req, res, next) => {
  const body = req.body

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson)
    })
    .catch((error) => next(error))
})

module.exports = personsRouter