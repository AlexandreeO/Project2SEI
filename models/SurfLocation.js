const mongoose = require("mongoose");

const surfLocationSchema = new mongoose.Schema({
    name: { type: String, equired: true },
    waveType: { type: String, required: false },
    difficultyLevel: { type: String, required: false },
    trip: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true },
});

const SurfLocation = mongoose.model("SurfLocation", surfLocationSchema);

module.exports = SurfLocation;
