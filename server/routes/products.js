// routes/products.js
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Create a product
router.post("/", async (req, res) => {
  try {
    const { name, categoryId, price } = req.body;

    const product = new Product({
      name,
      category: categoryId, // Associate the product with a category using its ID
      price,
    });

    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to create the product" });
  }
});
router.get("/", async (req, res) => {
  try {
    const category = req.query.category; // Get the selected category ID from the query parameter

    const products = await Product.find({ category });

    res.json(products);
  } catch (error) {
    console.error("Failed to fetch products", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

module.exports = router;
