const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // user-specific categories
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
