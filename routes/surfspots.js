const express = require("express");
const router = express.Router();
const surfSpotsCtrl = require("../controllers/surfSpotsCtrl");


router.get("/", surfSpotsCtrl.getAll)

router.get("/createspot", surfSpotsCtrl.renderNewSpotForm);

router.post("/", surfSpotsCtrl.addSpot);

// GET route to render the spot update form
router.get('/update/:id', surfSpotsCtrl.getSurfSpot);

// POST route to handle spot updates
router.put('/update/:id', surfSpotsCtrl.updateSurfSpot);



module.exports = router;
