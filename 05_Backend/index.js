// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

// Create an Express app
const app = express();

// Parse JSON requests
app.use(bodyParser.json());
app.use(cors());

// Define routes
const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userroutes.js");
const theatreRoutes = require("./routes/theatreRoutes.js");
const movieRoutes = require("./routes/movieRoutes.js");
const bookingRoutes = require("./routes/bookingRoutes.js");

// Connect to MongoDB asynchronously
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if unable to connect
  }
};

// Use the routes in your app
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/theatres", theatreRoutes);
app.use("/bookings", bookingRoutes);
app.use("/movies", movieRoutes);

// Start the server after connecting to MongoDB
const startServer = async () => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

// Call the asynchronous functions
connectToMongoDB().then(startServer);
