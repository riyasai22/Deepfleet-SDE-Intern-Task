// routes.js
const express = require("express");
const router = express.Router();
const Bill = require("../models/Bill");

// POST route to create a new bill
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

// GET route to retrieve bills
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
