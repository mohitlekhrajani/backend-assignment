// auth.js

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/userModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "634576392421-1am159nvn5rqot2ih5pfo37rhtrh7ve0.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      // This callback is where you would save the user to your database
      // You can use the profile information (profile.id, profile.displayName, etc.)
      // to find or create a user in your database.
      //return done(null, profile);
      try {
        // Check if the user already exists in your database
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          // If the user doesn't exist, create a new user
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            // You can add other fields from the profile if needed
          });

          await user.save();
        }
        // Create a JWT token
        const token = jwt.sign({ user: user.email }, "9999", {
          expiresIn: "1y", // Adjust the expiration time as needed
        });

        return done(null, { user, token });
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (obj, done) => {
  try {
    // Find the user by their ID
    const user = await User.findById(obj.user._id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
module.exports = passport;
