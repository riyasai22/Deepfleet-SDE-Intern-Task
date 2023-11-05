// Import required dependencies
const express = require("express"); // Express.js framework for building web applications
const mongoose = require("mongoose"); // Mongoose to work with MongoDB
const bodyParser = require("body-parser"); // Middleware for parsing request data
const cors = require("cors"); // Middleware for handling Cross-Origin Resource Sharing
const productCategoriesRoute = require("./routes/productCategories"); // Import routes for product categories
const productsRoute = require("./routes/products"); // Import routes for products
const billRoute = require("./routes/bill"); // Import routes for bills

const app = express(); // Initialize the Express application

// Middleware setup
app.use(bodyParser.json()); // Use the body-parser middleware to parse JSON data in requests
app.use(cors()); // Enable CORS to allow cross-origin requests

// MongoDB Connection
mongoose.connect(
  // Connect to MongoDB using Mongoose
  "mongodb+srv://username:password@cluster0.jmbhoqf.mongodb.net/gst?retryWrites=true&w=majority",
  {
    useNewUrlParser: true, // MongoDB connection options
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection; // Create a MongoDB connection instance

// Handle MongoDB connection events
db.on("error", console.error.bind(console, "MongoDB connection error:")); // On MongoDB connection error
db.once("open", () => {
  // When MongoDB connection is open
  console.log("Connected to MongoDB");
});

// Define routes for different parts of the application
app.use("/api/productCategories", productCategoriesRoute); // Route for product categories
app.use("/api/product", productsRoute); // Route for products
app.use("/api/bill", billRoute); // Route for bills

// Set up the server to listen on a port
const PORT = process.env.PORT || 5000; // Use the environment's port or 5000 as the default
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Print a message when the server is running
});
