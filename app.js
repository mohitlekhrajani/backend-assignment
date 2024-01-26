const express = require("express");
const bodyParser = require("body-parser");
const passport = require("./auth");
const session = require("express-session");
const noteRouter = require("./routes/noteRouter");
const connectDB = require("./db.config");
const { authenticateToken, rateLimiter } = require("./middlewares/middleware");
const locationController = require("./controllers/locationController");
const cors = require("cors");
const corsOptions = {
  origin: "*", // Replace with your actual frontend domain
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
const app = express();
const port = 3000;
// app.use(cors(corsOptions));
// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(session({ secret: "9999", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(rateLimiter);
// app.options("*", cors(corsOptions));

// Enable CORS with options

// Google OAuth 2.0 Sign-Up
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication
    res.json({ user: req.user.user, token: req.user.token });
  }
);

// Protected API Endpoint - Requires valid JSON Web Token in header field Authorization
app.get("/api/protected", authenticateToken, (req, res) => {
  res.json(req.user);
});

app.post(
  "/updateLocation",
  authenticateToken,
  locationController.updateLocation
);

app.get("/api", cors(corsOptions), (req, res) => {
  console.log("Frontend");
  res.json("OK");
});

// Routes
app.use("/notes", authenticateToken, noteRouter);
app.use(cors);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
