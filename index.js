const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    {
      "id": 1,
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": 2,
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": 3,
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": 4,
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    }
]


const generateId = () => {
  return Math.floor(Math.random() * 10000) + 1
}


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
  res.json(persons)
})


app.get('/api/persons/:id', (req, res) => {
  const person = persons.find(person => person.id === Number(req.params.id))

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }

  res.json(person)
})


app.delete('/api/persons/:id', (req, res) => {
  persons = persons.filter(person => person.id !== Number(req.params.id))
  res.status(204).end()
})


app.post('/api/persons', (req, res) => {

  if (!req.body.name) {
    return res.status(400).json({
      error: 'missing name'
    })
  }

  if (!req.body.number) {
    return res.status(400).json({
      error: 'missing number'
    })
  }

  const person = {
    id: generateId(),
    name: req.body.name,
    number: req.body.number
  }

  persons = persons.concat(person)

  res.json(person)
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})