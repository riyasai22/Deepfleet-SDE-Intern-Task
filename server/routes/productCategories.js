const express = require("express");
const router = express.Router();
const ProductCategory = require("../models/ProductCategory");

// Create product category
router.post("/", async (req, res) => {
  try {
    const { name, gstRates } = req.body;
    const newCategory = new ProductCategory({ name, gstRates });
    await newCategory.save();
    res.json(newCategory);
  } catch (error) {
    res.status(500).json({ error: "Failed to create product category" });
  }
});

// Display product categories
router.get("/", async (req, res) => {
  try {
    const categories = await ProductCategory.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve product categories" });
  }
});

// Update the GST rate for a specific ProductCategory
// Update the product category's name and GST rate by category ID
router.put("/:categoryId", async (req, res) => {
  try {
    const { categoryId } = req.params; // Get the category ID from the URL
    const { gstRate } = req.body; // Get the updated name and GST rate from the request body

    // Find the ProductCategory by its ID and update the name and gstRates fields
    const updatedCategory = await ProductCategory.findByIdAndUpdate(
      categoryId,
      { gstRates: gstRate }
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: "Failed to update category" });
  }
});

module.exports = router;
