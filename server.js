require("dotenv").config();
console.log("MONGO_URI =", process.env.MONGO_URI);

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const createError = require("http-errors");

const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Portfolio API Running");
});

// ROUTES
app.use("/api/services", require("./routes/services.routes"));
app.use("/api/projects", require("./routes/projects.routes"));
app.use("/api/references", require("./routes/references.routes"));
app.use("/api/users", require("./routes/users.routes"));

// 404 handler
app.use((req, res, next) => {
  next(createError(404, "Route not found"));
});

// error handler (LAST)
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
});

// SERVER START
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});