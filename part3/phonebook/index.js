const express = require('express');
// const morgan = require('morgan');
// const cors = require('cors');
const app = express();

app.use(express.static('dist'));
app.use(express.json());
// app.use(morgan(':method :url :status :response-time ms :reqBody'));
// app.use(cors());

let persons = [
    {
      "id": "1",
      "name": "Arto Hellas Kim",
      "number": "040-123456"
    },
    {
      "id": "2",
      "name": "Ada Lovelace Kim",
      "number": "39-44-5323523"
    },
    {
      "id": "3",
      "name": "Dan Abramov Kim",
      "number": "12-43-234345"
    },
    {
      "id": "4",
      "name": "Mary Poppendieck Kim",
      "number": "39-23-6423122"
    }
];

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.get('/info', (req, res) => {
    res.send(`
        <p>Phonebook has info for 2 people</p>
        ${new Date()}
    `)
});

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const foundPerson = persons.find(person => person.id === id);
    if(foundPerson){res.json(foundPerson)}
    else{res.status(404).end()}
});

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    persons = persons.filter(p => p.id !== id);

    res.status(204).end();
});

const generateId = () => {
    const maxId = persons.length > 0 ? Math.max(...persons.map(n => n.id)) : 0

    return String(maxId + 1)
}

app.post('/api/persons', (req, res) => {
    const body = req.body;

    if(!body.name || !body.number){
        return res.status(400).json({error: 'Bad Request: content missing'})
    }

    const checkName = persons.find(p => p.name === body.name);

    if(checkName){
        return res.status(409).json({error: 'name must be unique'});
    }

    const newPerson = {
      "id": generateId(),
      "name": body.name,
      "number": body.number
    }

    console.log(JSON.stringify(req.body));
    // morgan.token('body', JSON.stringify(req.body));
    morgan.token('reqBody', function (req, res) { return JSON.stringify(req.body) })

    persons = persons.concat(newPerson);
    return res.status(200).json(newPerson);
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
