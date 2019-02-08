const StaticData = require("../models/StaticData");

const findStaticData = () => {
  //get a single static data document from database
  return new Promise((resolve, reject) => {
    StaticData.findOne({})
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject("Could not get static data.");
      });
  });
};

module.exports = findStaticData;
