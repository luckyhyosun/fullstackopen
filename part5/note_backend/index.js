const express = require('express')

const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const notesRouter = require('./controllers/notes')

const app = express()

app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

app.listen(config.PORT, () =>
  logger.info(`Server running on port ${process.env.PORT}`),
)
