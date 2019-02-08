const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const User = require("../database/models/User");

module.exports = function(passport) {
  passport.use(
    new LocalStrategy((username, password, done) => {
      //Match User
      User.findOne({ username: username })
        .then(response => {
          if (!response) {
            return done(null, false, {
              message: "That username is not registered."
            });
          }
          //A user exists with that username, now compare if the password is correct:
          bcrypt.compare(password, response.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, response);
            } else {
              return done(null, false, { message: "Password incorrect." });
            }
          });
        })
        .catch(error => {});
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
