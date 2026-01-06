const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const expenseRoutes = require("./routes/expenses");
const categoryRoutes = require("./routes/categories");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/categories", categoryRoutes);

const PORT = process.env.PORT || 5000;

// Connect DB & Start Server
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
});
