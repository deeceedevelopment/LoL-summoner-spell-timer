const express = require("express");
const path = require("path");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");

require("dotenv").config();

const app = express();

//PASSPORT CONFIGURATION
require("./passport")(passport);

//DATABASE CONNECTION
mongoose.connect(process.env.MONGOOSE_URI, { useNewUrlParser: true });

//APP CONFIGURATION
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

//EXPRESS ROUTER
const apiRouter = require("./routes/api");
const adminRouter = require("./routes/admin");

app.use("/api/", apiRouter);
app.use("/admin/", adminRouter);

if (process.env.NODE_ENV === "production") {
  //set static folder for react SPA (build folder)
  app.use(express.static("client/build"));
  app.get("*", (req, res, next) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("*", (req, res, next) => {
    console.log("Catch-All in app.js");
    res.status(404).end();
  });
}

module.exports = app;

/*
  TO DO

  Rate Limits:
  - limit POST requests to /admin/login
  - limit GET requests to /admin/populate-database
  - limit GET requets to /api/static-data
  - limit GET requests to /api/active-match/ / / /


*/
