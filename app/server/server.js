const express = require('express')
const app = express()
const products = require('./routes/productsRoutes')

const port = process.env.PORT || 3000;

app.use(express.json())
app.use("/products",products)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})