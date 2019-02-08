const buildChampionObject = data => {
  const championObject = {};
  for (const champion in data) {
    championObject[data[champion].key] = data[champion].image.full;
  }
  return championObject;
};

const buildSummonerSpellObject = data => {
  const summonerSpellObject = {};
  for (const summonerSpell in data) {
    const summonerSpellData = data[summonerSpell];
    summonerSpellObject[summonerSpellData.key] = {
      imageUrl: summonerSpellData.image.full,
      cooldown: summonerSpellData.cooldownBurn
    };
  }
  return summonerSpellObject;
};

module.exports = {
  buildChampionObject,
  buildSummonerSpellObject
};
