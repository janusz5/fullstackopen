const express = require("express");
require('express-async-errors');
const { connectToDatabase } = require('./util/db')
const { PORT } = require('./util/config')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const middleware = require('./util/middleware')

const app = express();

app.use(express.json());

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)

app.use(middleware.errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
