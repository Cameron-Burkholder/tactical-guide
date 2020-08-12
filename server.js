const express = require("express");             // To handle server requests, request parsing, and api interactions
const path = require("path");
const app = express();                          // Initialize express

const port = process.env.PORT || 5000;          // The port to be used for the application
const bcrypt = require("bcrypt-nodejs");        // For password hashing and comparison
const uuid = require("uuid");                   // For use in json web tokens
const njwt = require("njwt");                   // For use in json web tokens
const fs = require("fs");                       // For writing to files
const names = ["Alex Diaz", "Cade Rush", "Cameron Burkholder", "Jack Estes", "Jon Barger", "Reese Barger", "Everett Chou"];
const team = [
  {
    name: "Cameron",
    url: "https://r6.tracker.network/profile/xbox/battlerifle10"
  },
  {
    name: "Alex",
    url: "https://r6.tracker.network/profile/xbox/FaZe%20Lucky%20X"
  },
  {
    name: "Everett",
    url: "https://r6.tracker.network/profile/xbox/XChoubaccaX"
  },
  {
    name: "Reese",
    url: "https://r6.tracker.network/profile/xbox/FaZe%20PMac%20X"
  },
  {
    name: "Cade",
    url: "https://r6.tracker.network/profile/xbox/FaZe%20XA%20AXii"
  },
  {
    name: "Jon",
    url: "https://r6.tracker.network/profile/xbox/FaZexXxTrash"
  },
  {
    name: "Jack",
    url: "https://r6.tracker.network/profile/xbox/FaZe%20Windu%20X"
  }
];
const getR6Data = require("./scraper.js");
const expDate = new Date("2020-12-31");

// setup mongo database
const mongodb = require("mongodb");             // For use in storing data
const MongoClient = mongodb.MongoClient;

require("dotenv").config();                     // For use in .env variables

// DEFINE SERVER USAGES
app.use(express.static(path.join(__dirname, "client", "public")));
app.use(express.json());

// CONNECT TO DATABASE
MongoClient.connect(process.env.MONGODB_URI, { useUnifiedTopology: true}, (err, client) => {

  // catch error
  if (err) {
    return console.log(err);
  }

  // setup database connection
  const db = client.db("heroku_tdxjsdv6");
  const collection = db.collection("data");

  // LOGIN
  // LOGIN FLOW: Name -> Secret -> Grant Token
  app.post("/api/authenticate-name", function(request, response) {
    log("POST request at /api/authenticate-name");
    // verify provided name matches verified user list
    let authenicated = (names.indexOf(request.body.name) < 0 ? false : true);
    response.json(authenicated);
  });
  app.post("/api/authenticate-secret", function(request, response) {
    log("POST request at /api/authenticate-secret");
    // verify provided secret matches verified secret
    let authenicated = (request.body.secret === process.env.SECRET ? true : false);
    response.json(authenicated);
  });
  app.post("/api/authenticate", function(request, response) {
    log("POST request at /api/authenicate");
    // grant json web token to device
    let auth_ = {
      token: genJSONWebToken(request.body.name),
      status: true,
      expiry: expDate
    };
    response.json(auth_);
  })

  // MAP DATA
  app.post("/api/retrieve-map-data", async function(request, response) {
    log("POST request at /api/retrieve-map-data");
    // validate token
    const isValidToken = await validateJSONWebToken(request.body.token);
    let packet = {
      status: isValidToken,
      strategies: null
    };
    if (isValidToken) {
      let mapStrategies = await new Promise((resolve, reject) => {
        collection.find().toArray().then(result => {
          resolve(result[0].strategies);
        }).catch(err => {
          if (err) {
            console.log(err);
            reject(err);
          }
        });
      });
      packet.strategies = mapStrategies;
    }
    response.json(packet);
  });
  app.post("/api/update-map-data", async function(request, response) {
    log("POST request at /api/update-map-data");
    // validate token
    const isValidToken = await validateJSONWebToken(request.body.token);
    let packet = {
      status: false
    };
    if (isValidToken) {
      packet.status = await updateMapData(request.body.map, request.body.site, request.body.data, request.body.bans);
    }
    response.json(packet);
  });

  // TEAM DATA
  app.post("/api/retrieve-team-data", async function(request, response) {
    log("POST request at /api/retrieve-team-data");
    // validate token
    const isValidToken = await validateJSONWebToken(request.body.token);
    let packet = {
      status: isValidToken,
      data: null
    };
    if (isValidToken) {
      const teamData = await new Promise((resolve, reject) => {
        collection.find().toArray().then(result => {
          resolve(result[0].teamData);
        }).catch(err => {
          if (err) {
            console.log(err);
            reject(false);
          }
        })
      })
      packet.data = teamData;
    }
    response.json(packet);
  });
  app.post("/api/update-team-data", async function(request, response) {
    log("POST request at /api/update-team-data");
    // validate token
    const isValidToken = await validateJSONWebToken(request.body.token);
    let packet = {
      status: isValidToken,
      data: null
    };
    if (isValidToken) {
      await getR6Data(team[0].url, team[0].name, updateTeamData, getTeamData);
      await getR6Data(team[1].url, team[1].name, updateTeamData, getTeamData);
      await getR6Data(team[2].url, team[2].name, updateTeamData, getTeamData);
      await getR6Data(team[3].url, team[3].name, updateTeamData, getTeamData);
      await getR6Data(team[4].url, team[4].name, updateTeamData, getTeamData);
      await getR6Data(team[5].url, team[5].name, updateTeamData, getTeamData);
      await getR6Data(team[6].url, team[6].name, updateTeamData, getTeamData);
      packet.data = await new Promise((resolve, reject) => {
        collection.find().toArray().then(result => {
          resolve(result[0].teamData);
        }).catch(err => {
          if (err) {
            console.log(err);
            reject(err);
          }
        });
      });
    }
    response.json(packet);
  });

  // OPERATOR DATA
  app.post("/api/retrieve-operator-data", async function(request, response) {
    log("POST request at /api/retrieve-operator-data");
    // validate token
    const isValidToken = await validateJSONWebToken(request.body.token);
    let packet = {
      status: isValidToken,
      data: null
    };
    if (isValidToken) {
      await new Promise((resolve, reject) => {
        collection.find().toArray().then(result => {
          packet.data = result[0].operators;
          resolve();
        }).catch(err => {
          if (err) {
            console.log(err);
            reject();
          }
        });
      });
    }
    response.json(packet);
  });

  // SERVE INDEX COMPONENT
  app.get("/*", function(request, response) {
    log("GET request at /*");
    response.sendFile(path.join(__dirname, "client", "public", "index.html"));
  });

  // SERVER FUNCTIONS

  /* GEN_JSON_WEB_TOKEN
  USE: generate a json web token
  PARAMS: the payload for a user: {
    user: *
  }
  RETURN: json web token (Object)
  */
  function genJSONWebToken(payload) {
    const claims = {
      user: payload,
      iat: 1580224887,
    };
    const jwt = njwt.create(claims, process.env.JWT_SECRET, "HS256");
    jwt.setExpiration(expDate);
    const token = jwt.compact();
    return token;
  }

  /* VALIDATE_JSON_WEB_TOKEN
  USE: validating json web token
  PARAMS: json web token (Object)
  RETURN: isValidToken (boolean)
  */
  async function validateJSONWebToken(token) {
    let isValidToken;
    try {
      isValidToken = await new Promise((resolve, reject) => {
        njwt.verify(token, process.env.JWT_SECRET, "HS256", function(err, token) {
          if (err || token.body === undefined) {
            reject(err);
          } else {
            resolve(true);
          }
        });
      });
    } catch(err) {
      log("ERROR while validating json web token at: validateJSONWebToken");
      console.log(err);
      return false;
    } finally {
      return isValidToken;
    }
  }

  /* DECRYPT_JSON_WEB_TOKEN
  USE: return unencrypted json web token
  PARAMS: json web token
  RETURN: token (Object)
  */
  function decryptJSONWebToken(encryptedToken) {
    return njwt.verify(encryptedToken, process.env.JWT_SECRET, "HS256");
  }

  /* UPDATE_MAP_DATA
  USE: update strategies json file
  PARAMS: map (string), site (string), data (json)
  RETURN: dataUpdated (Boolean)
  */
  async function updateMapData(map, site, data, bans) {
    let strategies = await new Promise((resolve, reject) => {
      collection.find().toArray().then(result => {
        resolve(result[0].strategies);
      }).catch(err => {
        if (err) {
          console.log(err);
          reject(err);
        }
      })
    });
    strategies[map][site] = JSON.parse(JSON.stringify(data));
    strategies[map].bans = bans;
    let status = await new Promise((resolve, reject) => {
      collection.update({ "name": "data"}, {$set: {
        strategies: strategies
      }}).then(() => {
        resolve(true);
      }).catch(err => {
        if (err) {
          console.log(err);
          reject(false);
        }
      });
    });

    const operatorStatus = await updateOperatorData();

    return status && operatorStatus;
  }


  /* UPDATE_OPERATOR_DATA
  USE: update operator file
  RETURN: dataUpdated (Boolean)
  */
  async function updateOperatorData() {
    const objectives = ["primary", "secondary", "tertiary", "quaternary"];
    let operators;
    let strategies = await new Promise((resolve, reject) => {
      collection.find().toArray().then(result => {
        operators = result[0].operators;
        resolve(result[0].strategies);
      }).catch(err => {
        if (err) {
          console.log(err);
          reject(err);
        }
      })
    });
    const maps = Object.keys(strategies);
    const result = await new Promise((resolve, reject) => {
      maps.map((map) => {
        objectives.map((objective) => {
          const site = strategies[map][objective];
          const siteName = map.toUpperCase() + ": " + site.site;
          site.defense.map((defense) => {
            defense.operators.map((operator) => {
              if (operator !== "Other" && operator !== "") {
                if (operators[operator].strats.indexOf(siteName) < 0) {
                  operators[operator].strats.push(siteName);
                }
              }
            });
          });
          site.offense.map((offense) => {
            offense.operators.map((operator) => {
              if (operator !== "Other" && operator !== "") {
                if (operators[operator].strats.indexOf(siteName) < 0) {
                  operators[operator].strats.push(siteName);
                }
              }
            });
          });
        });
      });
      collection.update({ "name": "data" }, {$set: {
        operators: operators
      }}).then(() => {
        resolve(true);
      }).catch(err => {
        if (err) {
          console.log(err);
          reject(false);
        }
      });
    });

    return result;
  }

  /* UPDATE_TEAM_DATA
  USE: update team data
  */
  async function updateTeamData(newTeamData) {
    collection.update({ "name": "data" }, {$set: {
      teamData: newTeamData
    }}).catch(err => {
      if (err) {
        console.log(err);
      }
    });
  }

  /* GET_TEAM_DATA
  USE: get team data
  RETURN: teamData (object)
  */
  async function getTeamData() {
    let teamData;
    await collection.find().toArray().then(result => {
      teamData = result[0].teamData;
    }).catch(err => {
      if (err) {
        console.log(err);
      }
    });

    return teamData;
  }

});

function log(msg) {
  console.log("--- " + Date() + " --- " + msg);
}

// START SERVER
app.listen(port, function() {
  log(`Strat website has started on port ${port}`);
});
