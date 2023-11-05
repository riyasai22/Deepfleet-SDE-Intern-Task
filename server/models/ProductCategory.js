// ProductCategory.js
const mongoose = require("mongoose");

const productCategorySchema = new mongoose.Schema({
  name: String,
  gstRates: Number,
});

module.exports = mongoose.model("ProductCategory", productCategorySchema);
