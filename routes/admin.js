const express = require("express");
const router = express.Router();
const path = require("path");
const passport = require("passport");
const rateLimit = require("express-rate-limit");

const createStaticData = require("../database/functions/createStaticData");

//Middleware to verify Admin Status from user request
const isAdmin = function(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.isAdmin) {
      next();
    }
  } else {
    res.redirect("/admin/login");
  }
};

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5
});

const populateDatabaseLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10
});

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

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/admin/login");
});

router.get("*", (req, res, next) => {
  console.log("Catch-All in routes/admin.js");
  res.status(404).end();
});

module.exports = router;

//POST route for registering an admin
// router.post("/register", isAdmin, (req, res) => {
//   const { username, password } = req.body;
//   const newUser = new User({ username, password, isAdmin: true });
//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) throw err;
//     bcrypt.hash(newUser.password, salt, (err, hash) => {
//       if (err) throw err;
//       newUser.password = hash;
//       newUser
//         .save()
//         .then(response => {
//           console.log("User successfully saved to database.");
//           res.status(200).send("Successfulyl registered user.");
//         })
//         .catch(error => {
//           console.log(error);
//           res.status(404).send("Failed to register user.");
//         });
//     });
//   });
// });
