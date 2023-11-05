// Product.js
const mongoose = require("mongoose");

const prodSchema = new mongoose.Schema({
  name: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductCategory",
  },
  price: Number,
});

module.exports = mongoose.model("Product", prodSchema);
