require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
app.use(express.json())


const swaggerJSDoc = require('swagger-jsdoc');

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
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);



// Load environment variables from .env file
dotenv.config();


const URI = process.env.URI

const authRoutes = require("./API/authAPI.js")
const userRoutes = require("./API/userAPI.js")
const theatreRoutes = require("./API/theatreAPI.js")
const movieRoutes = require("./API/movieAPI.js")
const bookingRoutes = require("./API/bookingAPI.js")



if (mongoose.connect(URI)) {
  console.log("🚀 Connected to Database Successfully 🚀")
  app.listen(process.env.PORT, () => {
    console.log("🚀 Server is running 🚀")
  })
} else {
  console.log("Failed to Connected.")
}


app.use('/api/auth', authRoutes) // Mount the userAPI router at the /api/users base path
app.use('/api/users', userRoutes) // Mount the userAPI router at the /api/users base path
app.use('/api/theatres', theatreRoutes) // Mount the theatreAPI router at the /api/theatres base path
app.use('/api/bookings', bookingRoutes)// Mount the bookingAPI router at the /api/bookings base path
app.use('/api/movies', movieRoutes) // Mount the movieAPI router at the /api/movies base path





