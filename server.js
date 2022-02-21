const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan');
const appRoutes = require('./routes');

const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('combined'))

app.use('/', appRoutes)

app.listen(port, console.log(`server is running on ${port}`))
