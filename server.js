const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/database");
require("./models/User");

const app = express();
const travelRoutes = require("./routes/travelroutes");
const authRoutes = require("./routes/auth");

app.use(cors());
app.use(express.json());
app.use("/api/travel", travelRoutes);
app.use("/api/auth", authRoutes);
console.log(
  "AUTH ROUTES:",
  authRoutes.stack.map(r => r.route?.path)
);
app.get("/test-login-route", (req, res) => {
  res.json({ message: "TEST WORKS" });
});
console.log("AUTH ROUTES LOADED");
app.get("/", (req, res) => {
  res.json({
    message: "AI Travel Planner Backend is running!",
  });
});

const PORT = process.env.PORT || 3000;

sequelize
  .sync()
  .then(() => {
    console.log("Database tables created successfully!");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database error:", error.message);
  });