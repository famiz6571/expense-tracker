const express = require("express");
const Category = require("../models/Category");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Create Category
router.post("/", authMiddleware, async (req, res) => {
  try {
    const category = await Category.create({ ...req.body, user: req.user });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get Categories for User
router.get("/", authMiddleware, async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user });
    res.json(categories);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Update Category
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(category);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Delete Category
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
