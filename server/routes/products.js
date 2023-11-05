// routes/products.js
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Create a product (POSR Request)

// Route: POST /api/product
// Description: This route allows you to create a new product by providing the product's name, associated category (by its ID), and the product's price.
// Request Body:
//    name: The name of the product.
//    categoryId: The ID of the associated category.
//    price: The price of the product.
// Response:
//    If the product is successfully created, it returns a JSON response with a status code of 200 and the newly created product.
//    In case of an error, it returns a JSON response with a status code of 500 and an error message.
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

// Fetch Products by Category (GET Request)

// Route: GET /api/product
// Description: This route allows you to fetch a list of products belonging to a specific category. You can specify the category using a query parameter.
// Query Parameter:
//    category: The ID of the category for which products need to be fetched.
// Response:
//    If products are found for the specified category, it returns a JSON response with the list of products.
//    In case of an error, it returns a JSON response with a status code of 500 and an error message.
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
