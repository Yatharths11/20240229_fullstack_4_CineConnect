// external imports
const express = require("express");
const router = express.Router();

// internal imports
const theatreController = require("../controllers/theatreController");

// routes
router.get("/", theatreController.theatreList);
router.get("/:id", theatreController.getTheatreDetailsById);
router.post("/", theatreController.createNewTheatre);
router.delete("/deleteTheatre/:id", theatreController.deleteTheatreById);
router.get("/:id/movies", theatreController.getMovies);

module.exports = router;
