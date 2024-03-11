// external imports
const express = require("express");
const router = express.Router();

// internal imports
const bookingController = require("../controllers/bookingController");

// routes
router.post("/postBooking/:id", bookingController.postBooking);
router.get("/myBooking", bookingController.myBooking);
router.delete("/cancelBooking/:id/", bookingController.cancelBooking);

module.exports = router;
