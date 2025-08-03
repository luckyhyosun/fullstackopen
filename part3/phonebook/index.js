require('dotenv').config()

const express = require('express');
const Person = require('./models/person');

const app = express();

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(express.static('dist'));
app.use(express.json());

app.get('/api/persons', (req, res) => {
    Person.find({}).then((persons => res.json(persons)))
});

app.get('/info', (req, res) => {
   Person.find({}).then(persons => {
    return res.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        ${new Date()}
    `)
   })
});

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;

    Person.findById(id).then(person => res.json(person))
});

app.post('/api/persons', (req, res) => {
    const body = req.body;

    if(!body.name || !body.number){
        return res.status(400).json({error: 'Bad Request: content missing'})
    }

    Person.find({}).then(persons => {
        persons.forEach(person => {
            if(person.name === body.name){
                const id = body.id
                return app.put(`/api/persons/:${id}`, (req, res) => {
                    person.number = body.number

                    return person.save().then(updatedPerson => res.json(updatedPerson))
                })
            }
        })
    })

    const newPerson = new Person({
      "name": body.name,
      "number": body.number
    })
    newPerson.save().then((savedPerson) => {
        res.json(savedPerson)
    })
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    Person.findByIdAndDelete(id)
        .then(result => res.status(204).end())
        .catch(error => next(error))
});

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
