// imports the actual application from the app.js file
// and then starts the application
const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () =>
  logger.info(`Server running on port ${process.env.PORT}`),
)
