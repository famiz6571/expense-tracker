const express = require("express");
const Expense = require("../models/Expense");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Create Expense
router.post("/", authMiddleware, async (req, res) => {
  try {
    const expense = await Expense.create({ ...req.body, user: req.user });
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get Expenses for User
router.get("/", authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user }).populate(
      "category"
    );
    res.json(expenses);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Update Expense
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(expense);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Delete Expense
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
