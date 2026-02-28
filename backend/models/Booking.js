import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, default: "pending" }, // pending, confirmed, cancelled
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);
