const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");

const { getActiveMatchData } = require("../functions/riotAPI");
const findStaticData = require("../database/functions/findStaticData");

const staticDataLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50
});

const activeMatchLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10
});

router.get("/static-data", staticDataLimiter, (req, res, next) => {
  findStaticData()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(404).send("Could not access database.");
    });
});

//GET active match data for Summoner:
router.get(
  "/active-match/region/:region/summoner/:name",
  activeMatchLimiter,
  (req, res, next) => {
    const { name, region } = req.params;
    getActiveMatchData(name, region)
      .then(response => {
        const players = response.participants || [];
        res.status(200).json({ participants: players });
      })
      .catch(error => {
        res.status(400).send(error);
      });
  }
);

router.get("*", (req, res, next) => {
  console.log("Catch-All in routes/api.js");
  res.status(404).send("What you are looking for cannot be found.");
});

module.exports = router;
