const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5
});

const populateDatabaseLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10
});

const staticDataLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50
});

const activeMatchLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10
});

module.exports = {
  loginLimiter,
  populateDatabaseLimiter,
  staticDataLimiter,
  activeMatchLimiter
};
