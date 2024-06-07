const express = require('express')
const db = require('../db/config')
const { ObjectId } = require('mongodb')

const router = express.Router()

// add products
router.post("/", async (req, res) => {
  try {
    let payload = {
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
    };
    let collection = await db.collection("products");
    let result = await collection.insertOne(payload);
    res.status(200).json({
      message: "success",
      data: payload
    })
  } catch (err) {
    console.error(err);
    res.status(500).send("error adding product");
  }
})

// get products
router.get("/", async (req, res) => {
  let collection = await db.collection("products");
  let results = await collection.find({}).toArray();
  res.status(200).json({
    data: results
  })
})

// get product by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("products");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) {
    res.status(404).json({ message: `data with id ${query._id} not found` })
  } else {
    res.status(200).json({ data: result })
  }
})

// update products by id
router.put("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
      },
    };

    let collection = await db.collection("products");
    let result = await collection.updateOne(query, updates)
    if (!result.acknowledged) {
      res.status(500).json({message: "internal server error"})
      return
    }
    res.status(200).json({message: "success"})
  } catch (err) {
    console.error(err);
    res.status(500).send("error updating product");
  }
});

// delete product
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("products");
    let result = await collection.deleteOne(query)
    if (result.deletedCount == 0) {
      res.status(404).json({message: "data not found"})
      return
    }
    res.status(200).json({message: "success"})
    } catch (err) {
      console.error(err);
      res.status(500).send("error deleting product");
  }
});

module.exports = router