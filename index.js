const express = require('express')
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

app.get('/', (request, response) => {
    response.send('<h1>Welcome to phonebook app, backend part</h1>')
})

app.get('/api/persons', (request, response) => {
    response.send(response.json(persons))
})

app.get('/info', (request, response) => {
    const date = new Date()
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

app.post('/api/persons', (request, response) => {
    const person = {
        "id": Math.floor(Math.random() * 10000),
        "name": request.params.name,
        "number": request.params.number,
    }

    // response.status(404).end()

    // try {
    //     if (person) response.send(person)
    // }
    // catch (error) {
    //     // response.status(400).json({error: 'name must be unique'}).end()
    //     response.status(code).send(new Error('test'))
    // }
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})