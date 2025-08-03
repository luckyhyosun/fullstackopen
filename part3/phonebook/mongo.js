const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const personName = process.argv[3]
const personNumber = process.argv[4]

// console.log(personName, personNumber);

const url = `mongodb+srv://luckyFullstack:${password}@cluster0.dguebgx.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personScheme = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personScheme)

const person = new Person({
  name: personName,
  number: personNumber,
})

// console.log(person);

// person.save().then(result => {
//   console.log(`added ${personName} number ${personNumber} to phonebook`)
//   mongoose.connection.close()
// })

Person
  .find({})
  .then(persons=> {
    persons.forEach(person => {
      console.log(person);
    })
    mongoose.connection.close()
  })
