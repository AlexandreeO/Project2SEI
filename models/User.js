const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: String,
        googleId: {
            type: String,
            required: true,
        },
        email: String,
        avatar: String,
        trips: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Trip",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
