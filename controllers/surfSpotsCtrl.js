const SurfSpotModel = require("../models/SurfSpot");
const SurfSpot = require('../models/SurfSpot');

async function getAll(req, res) {
    const allSpots = await SurfSpotModel.find({});
    res.render("surfSpots/allSpots", { allSpots })
}

async function addSpot(req, res) {
    await SurfSpotModel.create(req.body);
    res.redirect("/mytrips/newtrip");
}

async function renderNewSpotForm(req, res) {
    res.render("surfSpots/newSpot", { title: "WavePlanner" });
}

async function getSurfSpot(req, res) {
    try {
        const spot = await SurfSpot.findById(req.params.id);
        if (!spot) {
            return res.status(404).send('Spot not found');
        }
        res.render('surfSpots/updateSpot', { title: 'Update Spot', spot });
    } catch (err) {
        console.error('Error fetching spot:', err);
        res.status(500).send('Internal Server Error');
    }
};

async function updateSurfSpot(req, res) {
    try {
        const updatedSpot = await SurfSpot.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSpot) {
            return res.status(404).send('Spot not found');
        }
        res.redirect('/surfspots'); 
    } catch (err) {
        console.error('Error updating spot:', err);
        res.status(500).send('Internal Server Error');
    }
}


module.exports = {
    addSpot,
    renderNewSpotForm,
    getAll,
    updateSurfSpot,
    getSurfSpot
};
