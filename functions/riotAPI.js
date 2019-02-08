const axios = require("axios");
const API_KEY = process.env.API_KEY;
const { inputValid } = require("./utility");

function getSummonerId(summonerName, region) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${API_KEY}`
      )
      .then(response => {
        resolve(response.data.id);
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 403) {
            reject("Rate Limited by Riot API.");
          }
          if (error.response.status === 404) {
            reject("This summoner does not exist.");
          }
        } else if (error.request) {
          reject("This regional endpoint does not exist.");
        } else {
          reject("Something else went wrong.");
        }
      });
  });
}

function checkActiveMatch(summonerId, region) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://${region}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summonerId}?api_key=${API_KEY}`
      )
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject("This summoner is not in an active match.");
      });
  });
}

module.exports = {
  getCurrentPatch: function() {
    return new Promise((resolve, reject) => {
      axios
        .get("https://ddragon.leagueoflegends.com/api/versions.json")
        .then(response => {
          const currentPatch = response.data[0];
          resolve(currentPatch);
        })
        .catch(error => {
          reject("ERROR: Failed to get current patch.");
        });
    });
  },
  getChampionData: function(currentPatch) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `http://ddragon.leagueoflegends.com/cdn/${currentPatch}/data/en_US/champion.json`
        )
        .then(response => {
          resolve(response.data.data);
        })
        .catch(error => {
          reject("ERROR: Failed to get champion data.");
        });
    });
  },
  getSummonerSpellData: function(currentPatch) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `http://ddragon.leagueoflegends.com/cdn/${currentPatch}/data/en_US/summoner.json`
        )
        .then(response => {
          resolve(response.data.data);
        })
        .catch(error => {
          reject("ERROR: Failed to get summoner spell data.");
        });
    });
  },
  getActiveMatchData: function(summonerName, region) {
    if (!inputValid(summonerName, region)) {
      return Promise.reject("Input invalid.");
    }
    return new Promise((resolve, reject) => {
      getSummonerId(summonerName, region)
        .then(response => {
          return checkActiveMatch(response, region);
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
