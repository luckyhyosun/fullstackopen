const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://luckyFullstack:${password}@cluster0.dguebgx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const newNote = new Note({
  content: 'HTML is easy',
  important: true,
})

newNote.save().then(result => {
    console.log('note saved!');
    console.log(result)
    mongoose.connection.close()
})
