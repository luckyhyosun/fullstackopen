const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const Author = require('./models/author')
const Book = require('./models/book')

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      // return populated author objects so GraphQL Author type resolves
      const filter = {}
      if (args.genre) filter.genres = args.genre
      // if filtering by author name, find author and use its id
      if (args.author) {
        const a = await Author.findOne({ name: args.author })
        if (!a) return []
        filter.author = a._id
      }
      return Book.find(filter).populate('author')
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    // count by author ObjectId
    bookCount: async (root) => Book.countDocuments({ author: root._id })
  },
  Mutation: {
    addBook: async (root, args) => {
      // find existing author or create one
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author, born: null })
        if (author.name.length < 4) {
          throw new GraphQLError('too short author name', {
            extensions: { code: 'BAD_USER_INPUT' }
          })
        }
        await author.save()
      }

      const book = new Book({
        title: args.title,
        published: args.published,
        // store the ObjectId reference
        author: author._id,
        genres: args.genres
      })

      try {
        const saved = await book.save()
        // return populated author so the GraphQL Author fields are available
        return saved.populate('author')
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        })
      }
    },

    editAuthor: async (root, args) => {
      const foundAuthor = await Author.findOne({ name: args.name })
      if (!foundAuthor) return null

      foundAuthor.born = args.setBornTo

      try {
        return await foundAuthor.save()
      } catch (error) {
        throw new GraphQLError('Saving number failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
    },

    createUser: async (root, args) => {
      const user = new User({username: args.username, favoriteGenre: args.favoriteGenre})

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({username: args.username})

      if(!user || args.password !== 'hello'){
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const tokenForUser = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(tokenForUser, process.env.JWT_SECRET)}
    }
  }
}

module.exports = resolvers
