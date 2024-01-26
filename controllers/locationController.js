// controllers/locationController.js
const Location = require("../models/locationModel");
const updateLocationService = require("../services/locationService");

const updateLocation = async (req, res) => {
  const { latitude, longitude, locationUrl } = req.body;
  const { _id: userId, email: username } = req.user;
  try {
    const updateLoc = await updateLocationService(
      username,
      userId,
      latitude,
      longitude,
      locationUrl
    );
    res.status(200).send("Location updated successfully");
  } catch (error) {
    console.error("Error updating location:", error);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  updateLocation,
};
