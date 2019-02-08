const StaticData = require("../models/StaticData");

const {
  getCurrentPatch,
  getChampionData,
  getSummonerSpellData
} = require("../../functions/riotAPI");
const { buildChampionObject, buildSummonerSpellObject } = require("./utility");

const createStaticData = () => {
  //create a StaticData object from Model, save it to database
  return new Promise((resolve, reject) => {
    const staticData = {};
    getCurrentPatch()
      .then(response => {
        staticData.currentPatch = response;
        return getChampionData(staticData.currentPatch);
      })
      .then(response => {
        staticData.championData = buildChampionObject(response);
        return getSummonerSpellData(staticData.currentPatch);
      })
      .then(response => {
        staticData.summonerSpellData = buildSummonerSpellObject(response);
        //Delete existing Document from mongoDB:
        return StaticData.deleteMany({});
      })
      .then(response => {
        console.log("Deleted documents.");
        //Write the Document to mongoDB:
        return StaticData.create(staticData);
      })
      .then(response => {
        // console.log(
        //   `Static Data populated for Patch: ${response.currentPatch}`
        // );
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

module.exports = createStaticData;
