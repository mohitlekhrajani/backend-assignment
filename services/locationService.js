const Location = require("../models/locationModel");

const updateLocationService = async (
  username,
  userId,
  latitude,
  longitude,
  locationUrl
) => {
  try {
    // Check if a document with the given username and userId exists
    const existingLocation = await Location.findOne({ username, userId });
    if (existingLocation) {
      existingLocation.latitude = latitude;
      existingLocation.longitude = longitude;
      existingLocation.locationUrl = locationUrl;
      await existingLocation.save();
      return existingLocation;
    } else {
      const newLocation = new Location({
        username,
        userId,
        latitude,
        longitude,
        locationUrl,
      });
      await newLocation.save();
      return newLocation;
    }
  } catch (error) {
    console.error("Error updating location:", error);
    res.status(500).send("Internal server error");
  }
};
module.exports = updateLocationService;
