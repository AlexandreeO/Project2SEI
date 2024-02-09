const mongoose = require("mongoose");

const surfSpotSchema = new mongoose.Schema({
    name: { type: String, equired: true },
    location: { type: String, required: false },
    breakType: { type: String, required: false },
    difficultyLevel: { type: String, required: false },
});

const SurfSpot = mongoose.model("SurfSpot", surfSpotSchema);

module.exports = SurfSpot;
