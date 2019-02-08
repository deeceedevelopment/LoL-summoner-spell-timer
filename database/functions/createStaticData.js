const StaticData = require("../models/StaticData");
const path = require("path");
// const staticData = require("../../public/static-data");
const staticDataPath = require.resolve("../../public/static-data");
const fs = require("fs");

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
        staticData.name = "Dan";
        //Rewrite static-data.json in PUBLIC folder:
        // const filePath = `${__dirname}`;
        console.log(staticDataPath);
        fs.writeFile(
          staticDataPath,
          JSON.stringify(staticData),
          "utf8",
          err => {
            if (err) console.log(err);
            console.log("Rewrote static-data.json");
          }
        );
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
