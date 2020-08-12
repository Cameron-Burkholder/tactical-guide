const axios = require("axios");
const cheerio = require("cheerio");

async function getR6Data(url, name, update, getTeamData) {
  let teamData = await getTeamData();

  let index;
  for (let i = 0; i < teamData.data.length; i++) {
    if (teamData.data[i].name === name) {
      index = i;
      break;
    }
  }
  const result = await axios.get(url);

  const $ = cheerio.load(result.data);
  const rank = $("#profile > div.trn-scont.trn-scont--swap > div.trn-scont__aside > div:nth-child(1) > div.trn-card__content.trn-card--light.pt8.pb8 > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(1)").text();
  const img = $("#profile > div.trn-profile-header.trn-card > div > div.trn-profile-header__avatar.trn-roundavatar.trn-roundavatar--white > img").attr("src");
  const currentMMR = $("#profile > div.trn-scont.trn-scont--swap > div.trn-scont__aside > div:nth-child(1) > div.trn-card__content.trn-card--light.pt8.pb8 > div > div:nth-child(2) > div:nth-child(1) > div.trn-text--dimmed").text();
  const winPercentage = $("#profile > div.trn-scont.trn-scont--swap > div.trn-scont__content > div.trn-scont__content.trn-card.trn-card--dark-header > div.trn-card__content.pb16 > div > div:nth-child(2) > div.trn-defstat__value").text();
  const rankedWinPercentage = $("#profile > div.trn-scont.trn-scont--swap > div.trn-scont__content > div.r6-pvp-grid > div:nth-child(2) > div.trn-card__content > div > div:nth-child(7) > div.trn-defstat__value").text().replace("\n", "").replace("\n", "");
  const rankedKD = (rank === "Not ranked yet." ? $("#profile > div.trn-scont.trn-scont--swap > div.trn-scont__aside > div:nth-child(1) > div:nth-child(2) > div > span:nth-child(2)").text() : $("#profile > div.trn-scont.trn-scont--swap > div.trn-scont__aside > div:nth-child(1) > div:nth-child(2) > div > span:nth-child(2)").text());
  const overallRankedKD = $("#profile > div.trn-scont.trn-scont--swap > div.trn-scont__content > div.r6-pvp-grid > div:nth-child(2) > div.trn-card__content > div > div:nth-child(8) > div.trn-defstat__value").text().replace("\n", "").replace("\n", "");
  const timePlayed = $("#profile > div.trn-scont.trn-scont--swap > div.trn-scont__content > div:nth-child(2) > div.trn-card__content > div > div:nth-child(8) > div.trn-defstat__value").text().replace("\n", "").replace("\n", "");
  const rankedTimePlayed = $("#profile > div.trn-scont.trn-scont--swap > div.trn-scont__content > div.r6-pvp-grid > div:nth-child(2) > div.trn-card__content > div > div:nth-child(1) > div.trn-defstat__value").text().replace("\n", "").replace("\n", "");
  const killsPerGame = $("#profile > div.trn-scont.trn-scont--swap > div.trn-scont__content > div.r6-pvp-grid > div:nth-child(2) > div.trn-card__content > div > div:nth-child(9) > div.trn-defstat__value").text().replace("\n", "").replace("\n", "");
  const globalRank = $("#profile > div.trn-scont.trn-scont--swap > div.trn-scont__aside > div:nth-child(1) > div.trn-card__content.trn-card--light.pt8.pb8 > div > div:nth-child(2) > div.trn-text--primary").text().replace("\n", "").replace("\n", "");
  const level = $("#profile > div.trn-scont.trn-scont--swap > div.trn-scont__content > div.trn-scont__content.trn-card.trn-card--dark-header > div.trn-card__content.trn-card--light.trn-defstats-grid > div:nth-child(1) > div > div.trn-defstat__value").text().replace("\n", "").replace("\n", "");

  const operatorResult = await axios.get(url + "/operators");
  const OPERATORS = cheerio.load(operatorResult.data);

  const topAttackOperator = OPERATORS("#operators-Attackers > tbody > tr:nth-child(1) > td:nth-child(1) > span").text();
  const topAttackOperatorTime = OPERATORS("#operators-Attackers > tbody > tr:nth-child(1) > td:nth-child(2)").text();
  const topAttackOperatorKills = OPERATORS("#operators-Attackers > tbody > tr:nth-child(1) > td:nth-child(3)").text();
  const topAttackOperatorKD = OPERATORS("#operators-Attackers > tbody > tr:nth-child(1) > td:nth-child(4)").text();
  const topAttackOperatorHS = OPERATORS("#operators-Attackers > tbody > tr:nth-child(1) > td:nth-child(8)").text();
  const topAttackOperatorWP = OPERATORS("#operators-Attackers > tbody > tr:nth-child(1) > td:nth-child(7)").text();

  const topDefendOperator = OPERATORS("#operators-Defenders > tbody > tr:nth-child(1) > td:nth-child(1) > span").text();
  const topDefendOperatorTime = OPERATORS("#operators-Defenders > tbody > tr:nth-child(1) > td:nth-child(2)").text();
  const topDefendOperatorKills = OPERATORS("#operators-Defenders > tbody > tr:nth-child(1) > td:nth-child(3)").text();
  const topDefendOperatorKD = OPERATORS("#operators-Defenders > tbody > tr:nth-child(1) > td:nth-child(4)").text();
  const topDefendOperatorHS = OPERATORS("#operators-Defenders > tbody > tr:nth-child(1) > td:nth-child(8)").text();
  const topDefendOperatorWP = OPERATORS("#operators-Defenders > tbody > tr:nth-child(1) > td:nth-child(7)").text();

  const mmrResult = await axios.get(url + "/mmr-history");
  const MMR = cheerio.load(mmrResult.data);

  const mmrChange = MMR("#profile > div.trn-scont > div.trn-scont__content > div.trn-card.red > div.trn-table-container > table > tbody > tr:nth-child(1) > td:nth-child(5)").text().replace("\n", "").replace("\n", "");

  const user = teamData.data[index];
  user.name = name;
  user.rank = rank;
  user.img = img;
  user.currentMMR = currentMMR;
  user.winPercentage = winPercentage;
  user.rankedWinPercentage = rankedWinPercentage;
  user.rankedKD = rankedKD;
  user.overallRankedKD = overallRankedKD;
  user.timePlayed = timePlayed;
  user.rankedTimePlayed = rankedTimePlayed;
  user.killsPerGame = killsPerGame;
  user.globalRank = globalRank;

  user.topAttackOperator = topAttackOperator;
  user.topAttackOperatorTime = topAttackOperatorTime;
  user.topAttackOperatorKills = topAttackOperatorKills;
  user.topAttackOperatorKD = topAttackOperatorKD;
  user.topAttackOperatorHS = topAttackOperatorHS;
  user.topAttackOperatorWP = topAttackOperatorWP;

  user.topDefendOperator = topDefendOperator;
  user.topDefendOperatorTime = topDefendOperatorTime;
  user.topDefendOperatorKills = topDefendOperatorKills;
  user.topDefendOperatorKD = topDefendOperatorKD;
  user.topDefendOperatorHS = topDefendOperatorHS;
  user.topDefendOperatorWP = topDefendOperatorWP;

  user.mmrChange = mmrChange;

  teamData.data[index] = user;

  await update(JSON.parse(JSON.stringify(teamData)));
}

module.exports = getR6Data;
