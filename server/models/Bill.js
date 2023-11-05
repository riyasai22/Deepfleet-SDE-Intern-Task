// Bill.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const billSchema = new Schema({
  saleDetails: [
    {
      product: String,
      category: String,
      gstRate: Number,
      price: Number,
      tax: Number,
    },
  ],
});

module.exports = mongoose.model("Bill", billSchema);
