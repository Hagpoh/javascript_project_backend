const express = require('express')
const cors = require('cors')
const dataHandler = require('./helpers')
const MongoClient = require('mongodb').MongoClient
const app = express()

const connectionString =
  'mongodb+srv://Cocktail:drinkrecommendations@cocktailapp.fve6u.mongodb.net/?retryWrites=true&w=majority'

let PORT = process.env.PORT || 3000

MongoClient.connect(connectionString).then(client => {
  const db = client.db('cocktail-recommendation-history')
  const cocktailCollection = db.collection('cocktails')

  app.use(cors())

  app.listen(PORT, () => {
    console.log('Listening on port: ', PORT)
  })

  // localhost:3000/postDrink?loc=fresno&name=pat
  app.post('/postDrink', async (req, res) => {
    const { loc, name } = req.query
    const data = await dataHandler.getData(loc)
    await cocktailCollection.insertOne({
      fName: name,
      ...data
    })
    res.send(data)
  })

  // localhost:3000/getAllDrinks
  app.get('/getAllDrinks', (req, res) => {
    cocktailCollection
      .find()
      .toArray()
      .then(results => {
        res.send(results)
      })
  })
})
