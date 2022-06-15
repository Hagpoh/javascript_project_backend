require('dotenv').config()
const fetch = require('node-fetch')

async function getData (loc) {
  let response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${loc}&key=${process.env.OPENCAGEDATA_KEY}`
  )
  let data = await response.json()
  //Get the location information
  const { lat, lng } = data.results[0].geometry
  const { city, state } = data.results[0].components

  response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.OPENWEATHER_KEY}`
  )
  data = await response.json()
  //Get weather information
  const { temp } = data.main
  const fTemp = kelvinToFahrenheit(temp)

  response = await fetch(
    'http://www.thecocktaildb.com/api/json/v1/1/random.php'
  )
  data = await response.json()
  //Get the cocktail information
  const { strDrink, strDrinkThumb } = data.drinks[0]

  const fData = {
    fCity: city,
    fState: state,
    fTemp: fTemp,
    fDrink: strDrink,
    fImage: strDrinkThumb
  }
  return fData
}

function kelvinToFahrenheit (kTemp) {
  const fTemp = (kTemp - 273.15) * (9 / 5) + 32
  return fTemp
}

module.exports = {
  getData
}
