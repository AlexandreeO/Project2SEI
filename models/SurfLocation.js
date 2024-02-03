const mongoose = require("mongoose");

const surfLocationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    waveType: { type: String, required: true },
    difficultyLevel: { type: String, required: true },
    trip: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true },
});

const SurfLocation = mongoose.model("SurfLocation", surfLocationSchema);

module.exports = SurfLocation;
