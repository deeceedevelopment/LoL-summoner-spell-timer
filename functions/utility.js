module.exports = {
  inputValid: function(name, region) {
    validRegions = ["na1", "eun1", "euw1"];
    if (!validRegions.includes(region)) {
      return false;
    }
    if (name.length <= 0 || name.length > 16) {
      return false;
    }
    const summonerNameRegex = /^[a-zA-Z0-9\s]+$/;
    if (!name.match(summonerNameRegex)) {
      return false;
    }
    return true;
  }
};
