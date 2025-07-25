//CommonJS: 'require()' function and 'module.exports'
// const http = require('http')

//ES modules: 'import'and 'export' statement
// import http from 'http'

//Express library
const express = require('express');
const app = express();
// const cors = require('cors');

const requestLogger = (req, res, next) => {
  console.log('Method:', req.method)
  console.log('Path:  ', req.path)
  console.log('Body:  ', req.body)
  console.log('---')
  next();
}

//Custom middleware
// app.use(cors());
app.use(requestLogger);
app.use(express.static('dist'));
//we need the help of the Express json-parser which transform JSON to JS object.
app.use(express.json());

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]


// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'application/json' })
//   response.end(JSON.stringify(notes))
// })

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'text/plain' })
//   response.end('Hello World')
// })

// const PORT = 3001
// app.listen(PORT)
// console.log(`Server running on port ${PORT}`)


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  const note = notes.find(note => note.id === id)
  if(note){res.json(note);}
  else{res.status(404).end()}
})

app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  note = notes.filter(note => note.id !== id)

  res.status(204).end()
})

const generateId = () => {
  //spread syntax (...array) takes an array and "spreads" its elements into individual arguments.
  //Math.max(...[1, 5, 3]) -> becomes Math.max(1, 5, 3)
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

app.post('/api/notes', (req, res) => {
  const body = req.body;

  if(!body.content){
    return res.status(400).json({error: 'Bad Request: content missing'})
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId()
  }

  notes = notes.concat(note);
  response.json(note);
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
