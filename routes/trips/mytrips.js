const express = require("express");
const User = require("../../models/User");
const Trip = require("../../models/Trip");
const ensureLoggedIn = require("../../config/ensureLoggedIn");
const router = express.Router();

router.get("/", ensureLoggedIn, async (req, res) => {
    try {
        // Fetching trip from the database
        const userId = req.user._id; // Adjust based on session?
        console.log("User ID:", userId);
        // Finding the user by ID and populate trips field with trip details
        const user = await User.findById(userId).populate("trips");
        console.log("User:", user);
        res.render("trips/mytrips", { title: "WavePlanner", user });
    } catch (err) {
        console.error("Error fetching user trips:", err);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/newtrip", ensureLoggedIn, (req, res) => {
    res.render("trips/newtrip", { title: "WavePlanner" });
});

// handling the form submission to add new trip
router.post("/newtrip", ensureLoggedIn, async (req, res) => {
    try {
        const { name, startdate, enddate, location, spot } = req.body;
        const userId = req.user._id;
        console.log(userId);
        req.body.itinerary = [{ location, spot }];
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
    console.log(req.params.id);
    const trip = await Trip.findById(req.params.id);
    res.render("trips/showtrip", {
        title: trip.name,
        trip,
        startDate: formatDates(trip.startDate),
        endDate: formatDates(trip.endDate),
    });
});

module.exports = router;
