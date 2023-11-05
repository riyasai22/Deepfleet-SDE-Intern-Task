// routes.js
const express = require("express");
const router = express.Router();
const Bill = require("../models/Bill");

// Create a New Bill (POST Request)

// Route: POST /api/bill
// Description: This route allows you to create a new bill by providing an array of sale details. Each sale detail represents a product sold in the bill.
// Request Body:
//    saleDetails: An array of sale details, each containing information about a product in the bill, including its name, category, GST rate, price, and tax.
// Response:
//    If the bill is successfully created, it returns a JSON response with a status code of 200 and the newly created bill object.
//    In case of an error, it returns a JSON response with a status code of 500 and an error message.

router.post("/", async (req, res) => {
  try {
    const { saleDetails } = req.body;

    const newBill = new Bill({ saleDetails });

    const savedBill = await newBill.save();
    res.json(savedBill);
  } catch (error) {
    console.error("Failed to create a bill", error);
    res.status(500).json({ error: "Failed to create a bill" });
  }
});


// Retrieve Bills (GET Request)

// Route: GET /api/bill
// Description: This route allows you to retrieve a list of bills previously created in the system. It returns an array of bills.
// Response:
//   If bills are found, it returns a JSON response with the list of bills.
//   In case of an error, it returns a JSON response with a status code of 500 and an error message.

router.get("/", async (req, res) => {
  try {
    const bills = await Bill.find();
    res.json(bills);
  } catch (error) {
    console.error("Failed to fetch bills", error);
    res.status(500).json({ error: "Failed to fetch bills" });
  }
});

module.exports = router;
