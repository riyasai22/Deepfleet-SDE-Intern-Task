// SaleDetail.js
const mongoose = require('mongoose');

const saleDetailSchema = new mongoose.Schema({
  product: String,
  category: String,
  gstRate: Number,
  price: Number,
  tax: Number,
});

module.exports = mongoose.model('SaleDetail', saleDetailSchema);
