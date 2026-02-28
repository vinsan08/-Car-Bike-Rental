import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import vehicleRoutes from "./routes/vehicles.js";
import bookingRoutes from "./routes/bookings.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// connect
const uri = process.env.MONGO_URI || "mongodb://localhost:27017/rental";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error", err));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/bookings", bookingRoutes);

// health
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// Root route so accessing / doesn't show "Cannot GET /"
app.get("/", (req, res) => res.send("Rental System API is running! Access endpoints at /api/..."));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
