const mongoose = require("mongoose");


const destinationSchema = new mongoose.Schema({
    location: { type: String, required: true },
    spot: { type: String, required: true },
});

const tripSchema = new mongoose.Schema({
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    itinerary: [destinationSchema],
    status: {
        type: String,
        enum: ["Planned", "Completed"],
        default: "Planned",
    },
    // user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
},
{
    timestamps: true,
},
);

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
