require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const products = require('./routes/productsRoutes')

const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use("/products",products)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})