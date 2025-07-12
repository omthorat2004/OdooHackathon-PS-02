const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

//router
const authRouter = require('./routes/auth.route')
const questionRoute = require('./routes/question.route')
const answerRoute = require('./routes/answer.route')

//routes
app.use('/', authRouter)
app.use('/', questionRoute)
app.use('/', answerRoute)

app.listen(process.env.PORT, () => {
  console.log(`Server listening at Port ${process.env.PORT}`)
})
