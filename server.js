const express = require('express')
const cors = require('cors')
const dataHandler = require('./helpers')
const app = express()
app.use(cors())

let PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log('Listening on port 3000')
})

// localhost:3000?loc=fresno
app.get('/', async (req, res) => {
  const { loc } = req.query
  const data = await dataHandler.getData(loc)
  res.send(data)
})
