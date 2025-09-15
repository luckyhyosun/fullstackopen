const app = require('./app')

app.listen(process.env.PORT, () => {
  `Server running on port ${process.env.PORT}`
})
