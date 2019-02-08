const express = require("express");
const router = express.Router();
const path = require("path");
const passport = require("passport");

const createStaticData = require("../database/functions/createStaticData");
const { loginLimiter, populateDatabaseLimiter } = require("./middleware");
const isAdmin = require("../passport/middleware");

router.get(
  "/populate-database",
  isAdmin,
  populateDatabaseLimiter,
  (req, res) => {
    createStaticData()
      .then(response => {
        res.status(200).json(response);
      })
      .catch(error => {
        res.status(404).send(error);
      });
  }
);

router.get("/dashboard", isAdmin, (req, res) => {
  res.sendFile(path.resolve(__dirname, "../admin.html"));
});

router.get("/login", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../login.html"));
});

router.post(
  "/login",
  loginLimiter,
  passport.authenticate("local", { failureRedirect: "/admin/login" }),
  (req, res) => {
    res.redirect("/admin/dashboard");
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/admin/login");
});

router.get("*", (req, res, next) => {
  console.log("Catch-All in routes/admin.js");
  res.status(404).end();
});

module.exports = router;
