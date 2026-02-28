import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true }, // car, bike, etc.
    pricePerDay: { type: Number, required: true },
    location: { type: String, required: true },
    image: { type: String },
    images: [{ type: String }],
    available: { type: Boolean, default: true },
    year: { type: Number },
    specs: {
        transmission: String,
        fuel: String,
        seats: Number,
        engine: String
    },
    features: [String],
    reviews: [{
        user: String,
        rating: Number,
        comment: String,
        date: { type: Date, default: Date.now }
    }],
    owner: {
        name: String,
        rating: Number,
        memberSince: String
    }
}, { timestamps: true });

export default mongoose.model("Vehicle", vehicleSchema);
