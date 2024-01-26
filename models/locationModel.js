const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  locationUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
