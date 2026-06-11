const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();

// Production CORS Configuration
const allowedOrigins = [
  "http://localhost:5173", // Local Vite preview/dev port
  "http://localhost:3000", // Fallback local React port if needed
  process.env.FRONTEND_URL  // Your live Vercel URL (configured in Render Dashboard)
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or postman testing tools)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Blocked by CORS policy: Unauthorized origin."));
    }
  },
  credentials: true
}));

app.use(express.json());

// Serve static assets safely using absolute paths
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/itemRoutes"));
app.use("/api", require("./routes/responseRoutes"));

// Database Connection Lifecycle
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Production MongoDB Connected Successfully"))
  .catch(err => {
    console.error("Database connection error:", err.message);
    process.exit(1); // Crash gracefully if connection fails on startup
  });

// Dynamic Port Allocation for Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server executing securely on port ${PORT}`));