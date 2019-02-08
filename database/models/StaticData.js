const mongoose = require("mongoose");

const StaticDataSchema = new mongoose.Schema({
  championData: {
    type: Object,
    required: true
  },
  summonerSpellData: {
    type: Object,
    required: true
  },
  currentPatch: {
    type: String,
    required: true
  }
});

const StaticData = mongoose.model("StaticData", StaticDataSchema);

module.exports = StaticData;
