const { response } = require('express')
const express = require('express')
const fetch = require('node-fetch')

const app = express()

app.listen(3000, () => {
  console.log('Listening on port 3000')
})

app.get('/', (req, res) => {
  // fetch('http://www.thecocktaildb.com/api/json/v1/1/random.php')
  //   .then(response => response.json())
  //   .then(data => res.send(data))
})

fetch('http://www.thecocktaildb.com/api/json/v1/1/random.php')
  .then(response => response.json())
  .then(data => console.log(data))

fetch(
  'https://api.openweathermap.org/data/2.5/weather?lat=36&lon=119&appid=9eb3d733e0c3e1c9eca3820f3a53f491'
)
  .then(response => response.json())
  .then(data => console.log(data))

fetch(
  'https://api.opencagedata.com/geocode/v1/json?q=fresno california&key=b2e6eee44efa4813bb50007249307c34'
)
  .then(response => response.json())
  .then(data => console.log(data))
