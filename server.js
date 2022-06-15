const express = require('express')
const cors = require('cors')
const dataHandler = require('./helpers')
const MongoClient = require('mongodb').MongoClient
const app = express()
app.use(cors())

const connectionString = "mongodb+srv://Cocktail:drinkrecommendations@cocktailapp.fve6u.mongodb.net/?retryWrites=true&w=majority"

let PORT = process.env.PORT || 3000

MongoClient.connect(connectionString, (err, client) => {
  if (err) return console.error(err)
  console.log('Connected to Database')
})

app.listen(PORT, () => {
  console.log('Listening on port: ', PORT)
})

// localhost:3000?loc=fresno
app.get('/', async (req, res) => {
  const { loc } = req.query
  const data = await dataHandler.getData(loc)
  res.send(data)
})
