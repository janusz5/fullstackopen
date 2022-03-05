require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')

const cors = require('cors')
app.use(cors())

app.use(express.static('build'))

app.use(express.json())

var morgan = require('morgan')
morgan.token('json', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :json'))

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

app.get('/api/persons', (req, res) => {
    Person.find({})
        .then(persons => res.json(persons))
})

app.get('/info', (req, res) => {
    Person.count({})
        .then(count =>
            res.send(`<div>Phonebook has info for ${count} people</div><div>${new Date()}</div>`)
        )
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) res.json(person)
            else res.status(404).end()
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => res.status(204).end())
        .catch(error => next(error))
})

app.post("/api/persons", (req, res) => {
    const body = req.body

    if (!body.name) return res.status(400).json({ error: "name missing" })
    if (!body.number) return res.status(400).json({ error: "number missing" })

    Person.count({ name: body.name })
        .then(count => {
            if (count > 0) return res.status(400).json({ error: "name must be unique" })
            else {
                const person = new Person({
                    name: body.name,
                    number: body.number
                })
                person.save()
                    .then(savedPerson => res.json(savedPerson))
            }
        })
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPerson => res.json(updatedPerson))
        .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
    console.log(error.message)
    if (error.name == 'CastError') return res.status(400).send({ error: 'malformatted id' })
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
