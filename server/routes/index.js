var express = require("express");
const router = require("express").Router();
const Product = require("../models/Product.model");
const Cart = require("../models/Cart.model");
const { Types } = require("mongoose");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// get all products
router.get("/all-products", async (req, res) => {
  try {
    const products = await Product.find().limit(10);
    res.json({ products });
    console.log(`Found ${products.length} products`);
  } catch (err) {}
});

// routes below get items by category
router.get("/all-speakers", async (req, res) => {
  try {
    const speakers = await Product.find({ category: "speakers" });
    res.json({ speakers });
    console.log(`Found ${speakers.length}`);
  } catch (err) {}
});

router.get("/all-headphones", async (req, res) => {
  try {
    const headphones = await Product.find({ category: "headphones" });
    res.json({ headphones });
    console.log(`Found ${headphones}`);
  } catch (err) {}
});

router.get("/all-earphones", async (req, res) => {
  try {
    const earphones = await Product.find({ category: "earphones" });
    res.json({ earphones });
    console.log(`Found ${earphones.length} `);
  } catch (err) {}
});

// get item by id
router.get("/product/:id", async (req, res) => {
  const { id } = req.params;
  console.log("server 47", id);
  if (!Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  try {
    const products = await Product.findById(id);

    if (!id) {
      res.status(404).json({ message: `product not found ${id}` });
      return;
    }

    res.json({ products });
    console.log("found", products.name);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/add-to-cart/:id', (req,res,next)=>{

// })

// router.post("/add-to-cart", (req, res) => {
//   const { itemId } = req.body;
//   console.log("70 add to cart", itemId);

//   Cart.create({ item: itemId }).then((response) => {
//     console.log("this is line 92 response review route", response);
//     console.log("74", req.session);
//     res.status(200).json(response);
//   });
// });

// router.get("/cart", (req, res) => {
//   Cart.find()
//     .populate("item")
//     .then((cart) => res.json(cart))
//     .catch((err) => {
//       console.log("get cart error:", err);
//     });
// });

module.exports = router;
