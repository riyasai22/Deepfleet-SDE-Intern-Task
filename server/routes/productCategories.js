const express = require("express");
const router = express.Router();
const ProductCategory = require("../models/ProductCategory");

// Create Product Category (POST Request)

// Route: POST /api/productCategories
// Description: This route allows you to create a new product category by providing a name and GST rates.
// Request Body:
//     name: The name of the product category.
//     gstRates: The GST rates associated with the product category.
// Response:
//     If the product category is successfully created, it returns a JSON response with a status code of 200 and the newly created product category object.
//     In case of an error, it returns a JSON response with a status code of 500 and an error message.

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

// Display Product Categories (GET Request)

// Route: GET /api/productCategories
// Description: This route allows you to retrieve a list of all product categories in the system.
// Response:
//    If product categories are found, it returns a JSON response with the list of product categories.
//    In case of an error, it returns a JSON response with a status code of 500 and an error message.

router.get("/", async (req, res) => {
  try {
    const categories = await ProductCategory.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve product categories" });
  }
});

// Update GST Rate for a Specific Product Category (PUT Request)

// Route: PUT /api/productCategories/:categoryId
// Description: This route allows you to update the GST rate for a specific product category by specifying the category ID.
// Request Parameters:
//      categoryId: The ID of the product category to be updated, obtained from the URL.
// Request Body:
//      gstRate: The updated GST rate to be assigned to the product category.
// Response:
//     If the update is successful, it returns a JSON response with a status code of 200 and the updated product category object.
//     If the specified category is not found, it returns a JSON response with a status code of 404 and an error message.
// In case of any other error, it returns a JSON response with a status code of 500 and an error message.

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
