const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')

require('dotenv').config()
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const Author = require('./models/author')
const Book = require('./models/book')

const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type Book {
    title: String!
    published: Int
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!,
      author: String!,
      published: Int!,
      genres: [String!]!
    ): [Book!]!

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author!

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if(!args.author){
        return Book.find({})
      }
      if(args.genre){
        return Book.find({ genres: args.genre})
      }
    },
    allAuthors: async () => Author.find({})
  },
  Author: {
    bookCount: async (root) => Book.filter(book => book.author === root.name).length
  },
  Mutation: {
    addBook: async (root, args) => {
      const author = {name: args.author}
      if(author.name.length < 5){
        throw new GraphQLError('too short author name', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const book = {...args, author}
      if(book.title.length < 5){
        throw new GraphQLError('too short book name', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      try{
        await book.save()
      }catch(error){
        throw new GraphQLError('Saving person failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
    },

    editAuthor: async (root, args) => {
      const foundAuthor = Author.findOne({name:args.name})
      foundAuthor.born = args.born

      try{
        await foundAuthor.save()
      }catch(error){
        throw new GraphQLError('Saving number failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
