require('dotenv').config()

const express = require('express');
const Person = require('./models/person');

const app = express();

app.use(express.static('dist'));
app.use(express.json());

app.get('/api/persons', (req, res) => {
    Person.find({}).then((persons => {
        res.json(persons);
    }))
});

app.get('/info', (req, res) => {
    res.send(`
        <p>Phonebook has info for 2 people</p>
        ${new Date()}
    `)
});

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    // const foundPerson = persons.find(person => person.id === id);
    // if(foundPerson){res.json(foundPerson)}
    // else{res.status(404).end()}
    Person.findById(id).then((person) => {
        res.json(person)
    })
});

app.post('/api/persons', (req, res) => {
    const body = req.body;

    if(!body.name || !body.number){
        return res.status(400).json({error: 'Bad Request: content missing'})
    }

    // const checkName = persons.find(p => p.name === body.name);

    // if(checkName){
    //     return res.status(409).json({error: 'name must be unique'});
    // }

    const newPerson = new Person({
      "name": body.name,
      "number": body.number
    })

    // console.log(JSON.stringify(req.body));
    // morgan.token('body', JSON.stringify(req.body));
    // morgan.token('reqBody', function (req, res) { return JSON.stringify(req.body) })

    // persons = persons.concat(newPerson);
    // return res.status(200).json(newPerson);

    newPerson.save().then((savedPerson) => {
        res.json(savedPerson)
    })
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    persons = persons.filter(p => p.id !== id);

    res.status(204).end();
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
