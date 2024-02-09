const express = require("express");
const User = require("../models/User");
const Trip = require("../models/Trip");
const SurfSpot = require("../models/SurfSpot"); // Import the SurfSpot model
const ensureLoggedIn = require("../config/ensureLoggedIn");
const router = express.Router();

router.get("/", ensureLoggedIn, async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).populate("trips");

        // Extracting trip IDs from the user's trips
        const tripIds = user.trips.map((trip) => trip._id);

        // Finding all trips with the extracted trip IDs and populating the itinerary field with Surf Spot details
        const trips = await Trip.find({ _id: { $in: tripIds } }).populate({
            path: "itinerary",
            model: SurfSpot, // Specify the SurfSpot model to populate with
            select: "name location" // Select the fields to populate
        });

        console.log("User:", user);
        console.log("Trips:", trips);

        res.render("trips/mytrips", { title: "WavePlanner", user, trips });
    } catch (err) {
        console.error("Error fetching user trips:", err);
        res.status(500).send("Internal Server Error");
    }
});


router.get("/newtrip", ensureLoggedIn, async (req, res) => {
    const surfSpots = await SurfSpotModel.find({});
    res.render("trips/newtrip", { title: "WavePlanner", surfSpots });
});

// handling the form submission to add new trip
router.post("/newtrip", ensureLoggedIn, async (req, res) => {
    try {
        const { itinerary } = req.body;
        const userId = req.user._id;
        req.body.itinerary =
            typeof itinerary === "string" ? [itinerary] : itinerary;
        const trip = await Trip.create(req.body);
        // Add the new trip to the user's trips
        const user = await User.findById(userId);
        user.trips.push(trip._id);
        await user.save();

        res.redirect("/mytrips");
    } catch (err) {
        console.error("Error adding new trip:", err);
        res.status(500).send("Internal Server Error");
    }
});

function formatDates(targetDate) {
    let startDate = new Date(targetDate);
    const [startMonth, startDay, startYear] = startDate
        .toLocaleDateString()
        .split("/");
    return `${startYear}-${
        startMonth.length === 2 ? startMonth : "0" + startMonth
    }-${startDay.length === 2 ? startDay : "0" + startDay}`;
}

// get showtrip
router.get("/showtrip/:id", ensureLoggedIn, async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id).populate("itinerary");
        const spots = trip.itinerary;

        res.render("trips/showtrip", {
            title: trip.name,
            trip,
            spots,
            startDate: formatDates(trip.startDate),
            endDate: formatDates(trip.endDate),
        });
    } catch (err) {
        console.error("Error fetching trip details:", err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
