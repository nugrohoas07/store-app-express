// import { MongoClient, ServerApiVersion } from "mongodb";
const { MongoClient, ServerApiVersion } = require('mongodb')

const URI = process.env.ATLAS_URI || ""
const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

async function connectDB() {
  try {
    // Connect the client to the server
    await client.connect()
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 })
    console.log("Pinged your deployment. You successfully connected to MongoDB!")
  } catch (err) {
    console.error(err);
  }
}

connectDB().catch(console.error)

let db = client.db("stores")

// export default db;
module.exports = db
