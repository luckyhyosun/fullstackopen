const Note = require('../models/note')

const usersInDb = async () => {
  const users = await Note.find({})
  return users.map((user) => user.toJSON())
}

module.exports = { usersInDb }
