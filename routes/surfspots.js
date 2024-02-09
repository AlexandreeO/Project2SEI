const express = require("express");
const router = express.Router();
const surfSpotsCtrl = require("../controllers/surfSpotsCtrl");
const ensureLoggedIn = require("../config/ensureLoggedIn");


router.get("/", surfSpotsCtrl.getAll)

router.get("/createspot", ensureLoggedIn, surfSpotsCtrl.renderNewSpotForm);

router.post("/",ensureLoggedIn, surfSpotsCtrl.addSpot);

// GET route to render the spot update form
router.get('/update/:id',ensureLoggedIn, surfSpotsCtrl.getSurfSpot);

// POST route to handle spot updates
router.put('/update/:id',ensureLoggedIn, surfSpotsCtrl.updateSurfSpot);



module.exports = router;
