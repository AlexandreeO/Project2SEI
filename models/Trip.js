const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    itinerary: [{ type: mongoose.Schema.Types.ObjectId, ref: "SurfSpot"}],
    status: {
        type: String,
        enum: ["Planned", "Completed"],
        default: "Planned",
    },
},
{
    timestamps: true,
},
);

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
