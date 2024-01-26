// db.config.js

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mohitlekh:test123@cluster0.oruksqi.mongodb.net/notesdb?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to the database!");
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;
