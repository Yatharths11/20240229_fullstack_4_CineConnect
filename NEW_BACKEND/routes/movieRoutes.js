// external imports
const express = require("express");
const router = express.Router();

// internal imports
const movieController = require("../controllers/movieController");

// routes
router.get("/", movieController.getMovies);
router.get("/:id", movieController.getMovieById);
router.get("/search/name", movieController.getMovieByName);
router.post("/post", movieController.insertNewMovie);
router.put("/update/:id", movieController.updateMovie);
router.delete("/delete/:id", movieController.deleteMovieById);

module.exports = router;
