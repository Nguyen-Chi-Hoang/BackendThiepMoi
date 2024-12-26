const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Wish = require("./models/Wish");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});
// API để lưu lời chúc
app.post("/api/wishes", async (req, res) => {
  try {
    const { name, message } = req.body;
    const wish = new Wish({ name, message });
    await wish.save();
    res.status(201).json(wish);
  } catch (err) {
    res.status(500).json({ error: "Failed to save the wish" });
  }
});

// API để lấy danh sách lời chúc
app.get("/api/wishes", async (req, res) => {
  try {
    const wishes = await Wish.find();
    res.status(200).json(wishes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch wishes" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
