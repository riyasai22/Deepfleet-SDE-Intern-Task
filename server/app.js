const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const productCategoriesRoute = require("./routes/productCategories");
const productsRoute = require("./routes/products");
const billRoute = require("./routes/bill");

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Define your routes next
// const gstRatesRoute = require("./routes/gstRates");
// const salesRoute = require("./routes/sales");
// MongoDB Connection
mongoose.connect(
  "mongodb+srv://username:password@cluster0.jmbhoqf.mongodb.net/gst?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use("/api/productCategories", productCategoriesRoute);
app.use("/api/product", productsRoute);
app.use("/api/bill", billRoute);

// app.use("/gstRates", gstRatesRoute);
// app.use("/sales", salesRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
