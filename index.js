const express = require('express')
const morgan = require('morgan')
const app = express()

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

const requestLogger = (request, response, next) => {
    console.log(`Method: ${request.method}`)
    console.log(`Path: ${request.path}`)
    console.log(`Body: ${request.body}`)
    console.log('---')
    next()
}

morgan.token('body', (request, response) => JSON.stringify(request.body))

app.get('/', (request, response) => {
    response.send('<h1>Welcome to phonebook app, backend part</h1>')
})

app.get('/api/persons', (request, response) => {
    response.send(response.json(persons))
})

app.get('/info', (request, response) => {
    const date = new Date(Date.now())
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) response.json(person)
    response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.findIndex(person => person.id === id)
    persons.splice(person, 1)
    response.status(404).end()
})

app.use(express.json())
// app.use(requestLogger)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.post('/api/persons', (request, response) => {
    const person = {
        "id": Math.floor(Math.random() * 10000),
        "name": request.body.name,
        "number": request.body.number,
    }

    const checkPerson = person.name.length === 0 || persons.map(a => a.name).find(a => a === person.name) === person.name
    const checkNumber = persons.map(a => a.number).find(a => a === person.number) === person.number

    if (!checkPerson && !checkNumber) {
        response.send(person)
    } else { response.status(400).send({ error: 'name and number must be unique and not empty' }) }
    response.status(400).end()
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})