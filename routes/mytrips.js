const express = require("express");
const User = require("../models/User");
const Trip = require("../models/Trip");
const SurfSpot = require("../models/SurfSpot"); // Import the SurfSpot model
const ensureLoggedIn = require("../config/ensureLoggedIn");
const router = express.Router();

router.get("/", ensureLoggedIn, async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).populate({
            path: "trips",
            populate: { path: "itinerary", model: SurfSpot },
        });

        res.render("trips/mytrips", { title: "WavePlanner", user });
    } catch (err) {
        console.error("Error fetching user trips:", err);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/newtrip", ensureLoggedIn, async (req, res) => {
    const surfSpots = await SurfSpot.find({});
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

// delete a trip by ID
router.delete("/:id", async (req, res) => {
    try {
        const tripId = req.params.id;
        await Trip.findByIdAndDelete(tripId);
        res.redirect("/mytrips"); // Redirect to the trips page after deletion
    } catch (error) {
        console.error("Error deleting trip:", error);
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

// GET route to render the update form for a specific trip
router.put("/:id", async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);
        if (!trip) {
            return res.status(404).send("Trip not found");
        }
        const surfSpots = await SurfSpot.find({});
        res.render("trips/updateTrip", { title: "WavePlanner", trip, surfSpots }); // Assuming you have a view file named updateTripForm.ejs for the update form
    } catch (error) {
        console.error("Error fetching trip for update:", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
