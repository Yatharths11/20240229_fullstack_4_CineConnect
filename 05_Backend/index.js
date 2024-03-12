// Import required modules
require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for JSONPlaceholder',
    version: '1.0.0',
    description:
      'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'JSONPlaceholder',
      url: 'https://jsonplaceholder.typicode.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./API/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Create an Express app
const app = express();

// Parse JSON requests
app.use(bodyParser.json());

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
