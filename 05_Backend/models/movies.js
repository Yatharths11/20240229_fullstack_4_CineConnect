const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  IMG: {
    type: String,
    required: true,
  },
  theatre_id: {
    type: String,
    ref: "Theatre",
    required: true,
  },

  description: {
    type: String,
  },

  screen: {
    type: String,
    required: true,
  },

  language: {
    type: String,
    required: true,
  },

  genre: {
    type: [String],
    required: true,
  },

  price: {
    type: Number,
    required: true,
    min: 50,
  },

  ratings: {
    type: Number,
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },

  availableSeats: {
    type: Number,
    default: 100,
    min: 0,
  },

  pgRating: {
    type: String,
    required: true,
    enum: ["G", "PG", "PG-13", "R", "NC-17"],
  },
});

module.exports = mongoose.model("Movie", movieSchema);
