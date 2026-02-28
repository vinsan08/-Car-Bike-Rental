import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

// get bookings for a user
router.get("/user/:userId", async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.params.userId }).populate("vehicle");
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// create booking
router.post("/", async (req, res) => {
    try {
        const booking = new Booking(req.body);
        await booking.save();
        res.status(201).json(booking);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
