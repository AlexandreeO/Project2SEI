const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String },
    status: {
        type: String,
        enum: ["Planned", "Completed"],
        default: "Planned",
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
