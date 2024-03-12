// external imports
const express = require("express");
const router = express.Router();

// internal imports
const userController = require("../controllers/userController");

// routes
router.post("/register", userController.register);
router.get("/info/:id", userController.info);
router.put("/update/:id", userController.update);
router.delete("/delete/:id", userController.deleteUser);

// exports
module.exports = router;
