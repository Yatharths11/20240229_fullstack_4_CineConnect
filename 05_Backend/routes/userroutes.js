// external imports
const express = require("express");
const router = express.Router();

// internal imports
const userController = require("../controllers/userController");

// routes
router.post("/register", userController.register);
router.get("/info", userController.info);
router.put("/update", userController.update);
router.delete("/delete", userController.deleteUser);

// exports
module.exports = router;
