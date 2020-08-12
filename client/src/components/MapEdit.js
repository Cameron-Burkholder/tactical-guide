import React from "react";
import ReactDOM from "react-dom";

import StrategySelector from "./StrategySelector.js";

// USE: display map
// PROPS: token (function), map (string), data (object)
const SELECT = "SELECT";
const PRIMARY = "PRIMARY";
const SECONDARY = "SECONDARY";
const TERTIARY = "TERTIARY";
const QUATERNARY = "QUATERNARY";
const LOADING = "LOADING";
const FAILURE = "FAILURE";
const SUCCESS = "SUCCESS";
const MAP_REFERENCE = {
  "bank": "Bank",
  "border": "Border",
  "chalet": "Chalet",
  "clubhouse": "Clubhouse",
  "coastline": "Coastline",
  "consulate": "Consulate",
  "kafe_dostoyevsky": "Kafe Dostoyevsky",
  "kanal": "Kanal",
  "oregon": "Oregon",
  "outback": "Outback",
  "theme_park": "Theme Park",
  "villa": "Villa"
};
const newOffense = {
  operators: ["", "", "", "", ""],
  roles: ["", "", "", "", ""],
  objective: ["", "", "", "", ""],
  notes: ""
};
const newDefense = {
  operators: ["", "", "", "", ""],
  roles: ["", "", "", "", ""],
  locations: ["", "", "", "", ""],
  notes: ""
};
class MapEdit extends React.Component {
  constructor(props) {
    super(props);

    this.viewSites = this.viewSites.bind(this);
    this.selectPrimary = this.selectPrimary.bind(this);
    this.selectSecondary = this.selectSecondary.bind(this);
    this.selectTertiary = this.selectTertiary.bind(this);
    this.selectQuaternary = this.selectQuaternary.bind(this);

    this.incrementStrategyIndex = this.incrementStrategyIndex.bind(this);
    this.decrementStrategyIndex = this.decrementStrategyIndex.bind(this);
    this.createNewStrategy = this.createNewStrategy.bind(this);
    this.removeStrategy = this.removeStrategy.bind(this);

    this.editBans = this.editBans.bind(this);
    this.editNames = this.editNames.bind(this);
    this.editRoles = this.editRoles.bind(this);
    this.editObjective = this.editObjective.bind(this);
    this.editLocations = this.editLocations.bind(this);
    this.editNotes = this.editNotes.bind(this);
    this.updateMap = this.updateMap.bind(this);

    const data = this.props.data[this.props.map];

    this.state = {
      status: SELECT,
      bans: data.bans,
      primary: data.primary,
      secondary: data.secondary,
      tertiary: data.tertiary,
      quaternary: data.quaternary,
      hasUpdated: false,
      stratIndex: 0
    };
  }

  editBans(event, index) {
    let newBans = this.state.bans;
    newBans[index] = event.target.value;
    this.setState({
      bans: newBans,
      hasUpdated: true
    });
  }
  editNames(event, type, index) {
    let site;
    if (this.state.status === PRIMARY) {
      site = this.state.primary;
    } else if (this.state.status === SECONDARY) {
      site = this.state.secondary;
    } else if (this.state.status === TERTIARY) {
      site = this.state.tertiary;
    } else {
      site = this.state.quaternary;
    }
    let operatorNames = site[type][this.state.stratIndex].operators;
    operatorNames[index] = event.target.value;
    site[type][this.state.stratIndex].operators = operatorNames;
    if (this.state.status === PRIMARY) {
      this.setState({
        primary: site,
        hasUpdated: true
      });
    } else if (this.state.status === SECONDARY) {
      this.setState({
        secondary: site,
        hasUpdated: true
      });
    } else if (this.state.status === TERTIARY) {
      this.setState({
        tertiary: site,
        hasUpdated: true
      });
    } else {
      this.setState({
        quaternary: site,
        hasUpdated: true
      });
    }
  }
  editRoles(event, type, index) {
    let site;
    if (this.state.status === PRIMARY) {
      site = this.state.primary;
    } else if (this.state.status === SECONDARY) {
      site = this.state.secondary;
    } else if (this.state.status === TERTIARY) {
      site = this.state.tertiary;
    } else {
      site = this.state.quaternary;
    }
    let operatorRoles = site[type][this.state.stratIndex].roles;
    operatorRoles[index] = event.target.value;
    site[type].roles = operatorRoles;
    if (this.state.status === PRIMARY) {
      this.setState({
        primary: site,
        hasUpdated: true
      });
    } else if (this.state.status === SECONDARY) {
      this.setState({
        secondary: site,
        hasUpdated: true
      });
    } else if (this.state.status === TERTIARY) {
      this.setState({
        tertiary: site,
        hasUpdated: true
      });
    } else {
      this.setState({
        quaternary: site,
        hasUpdated: true
      });
    }
  }
  editObjective(event, type, index) {
    let site;
    if (this.state.status === PRIMARY) {
      site = this.state.primary;
    } else if (this.state.status === SECONDARY) {
      site = this.state.secondary;
    } else if (this.state.status === TERTIARY) {
      site = this.state.tertiary;
    } else {
      site = this.state.quaternary;
    }
    let operatorObjective = site[type][this.state.stratIndex].objective;
    operatorObjective[index] = event.target.value;
    site[type].objective = operatorObjective;
    if (this.state.status === PRIMARY) {
      this.setState({
        primary: site,
        hasUpdated: true
      });
    } else if (this.state.status === SECONDARY) {
      this.setState({
        secondary: site,
        hasUpdated: true
      });
    } else if (this.state.status === TERTIARY) {
      this.setState({
        tertiary: site,
        hasUpdated: true
      });
    } else {
      this.setState({
        quaternary: site,
        hasUpdated: true
      });
    }
  }
  editLocations(event, type, index) {
    let site;
    if (this.state.status === PRIMARY) {
      site = this.state.primary;
    } else if (this.state.status === SECONDARY) {
      site = this.state.secondary;
    } else if (this.state.status === TERTIARY) {
      site = this.state.tertiary;
    } else {
      site = this.state.quaternary;
    }
    let operatorLocations = site[type][this.state.stratIndex].locations;
    operatorLocations[index] = event.target.value;
    site[type].locations = operatorLocations;
    if (this.state.status === PRIMARY) {
      this.setState({
        primary: site,
        hasUpdated: true
      });
    } else if (this.state.status === SECONDARY) {
      this.setState({
        secondary: site,
        hasUpdated: true
      });
    } else if (this.state.status === TERTIARY) {
      this.setState({
        tertiary: site,
        hasUpdated: true
      });
    } else {
      this.setState({
        quaternary: site,
        hasUpdated: true
      });
    }
  }
  editNotes(event, type) {
    let site;
    if (this.state.status === PRIMARY) {
      site = this.state.primary;
    } else if (this.state.status === SECONDARY) {
      site = this.state.secondary;
    } else if (this.state.status === TERTIARY) {
      site = this.state.tertiary;
    } else {
      site = this.state.quaternary;
    }
    const stratIndex = this.state.stratIndex;
    site[type][stratIndex].notes = event.target.value;
    if (this.state.status === PRIMARY) {
      this.setState({
        primary: site,
        hasUpdated: true
      });
    } else if (this.state.status === SECONDARY) {
      this.setState({
        secondary: site,
        hasUpdated: true
      });
    } else if (this.state.status === TERTIARY) {
      this.setState({
        tertiary: site,
        hasUpdated: true
      });
    } else {
      this.setState({
        quaternary: site,
        hasUpdated: true
      });
    }
  }
  updateMap() {
    this.setState({
      status: LOADING
    });
    let mapData;
    if (this.state.status === PRIMARY) {
      mapData = JSON.parse(JSON.stringify(this.state.primary));
    } else if (this.state.status === SECONDARY) {
      mapData = JSON.parse(JSON.stringify(this.state.secondary));
    } else if (this.state.status === TERTIARY) {
      mapData = JSON.parse(JSON.stringify(this.state.tertiary));
    } else {
      mapData = JSON.parse(JSON.stringify(this.state.quaternary));
    }
    const component = this;
    fetch("/api/update-map-data", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: component.props.token(),
        map: component.props.map,
        site: component.state.status.toLowerCase(),
        data: mapData,
        bans: component.state.bans
      })
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      if (data.status) {
        component.setState({
          status: SUCCESS
        });
      } else {
        component.setState({
          status: FAILURE
        });
      }
    });
  }

  incrementStrategyIndex() {
    if (this.state.hasUpdated) {
      if (confirm("You have updated this strategy. Switching to another without saving will result in loss of data. Confirm.")) {
        let site;
        if (this.state.status === PRIMARY) {
          site = this.props.data[this.props.map].primary;
        } else if (this.state.status === SECONDARY) {
          site = this.props.data[this.props.map].secondary;
        } else if (this.state.status === TERTIARY) {
          site = this.props.data[this.props.map].tertiary;
        } else {
          site = this.props.data[this.props.map].quaternary;
        }
        if (this.state.stratIndex + 1 < site.offense.length) {
          this.setState({
            stratIndex: this.state.stratIndex + 1,
            hasUpdated: false
          });
        }
      }
    } else {
      let site;
      if (this.state.status === PRIMARY) {
        site = this.props.data[this.props.map].primary;
      } else if (this.state.status === SECONDARY) {
        site = this.props.data[this.props.map].secondary;
      } else if (this.state.status === TERTIARY) {
        site = this.props.data[this.props.map].tertiary;
      } else {
        site = this.props.data[this.props.map].quaternary;
      }
      if (this.state.stratIndex + 1 < site.offense.length) {
        this.setState({
          stratIndex: this.state.stratIndex + 1,
          hasUpdated: false
        });
      }
    }
  }
  decrementStrategyIndex() {
    if (this.state.hasUpdated) {
      if (confirm("You have updated this strategy. Switching to another without saving will result in loss of data. Confirm.")) {
        let site;
        if (this.state.status === PRIMARY) {
          site = this.props.data[this.props.map].primary;
        } else if (this.state.status === SECONDARY) {
          site = this.props.data[this.props.map].secondary;
        } else if (this.state.status === TERTIARY) {
          site = this.props.data[this.props.map].tertiary;
        } else {
          site = this.props.data[this.props.map].quaternary;
        }
        if (this.state.stratIndex - 1 >= 0) {
          this.setState({
            stratIndex: this.state.stratIndex - 1,
            hasUpdated: false
          });
        }
      }
    } else {
      let site;
      if (this.state.status === PRIMARY) {
        site = this.props.data[this.props.map].primary;
      } else if (this.state.status === SECONDARY) {
        site = this.props.data[this.props.map].secondary;
      } else if (this.state.status === TERTIARY) {
        site = this.props.data[this.props.map].tertiary;
      } else {
        site = this.props.data[this.props.map].quaternary;
      }
      if (this.state.stratIndex - 1 >= 0) {
        this.setState({
          stratIndex: this.state.stratIndex - 1,
          hasUpdated: false
        });
      }
    }
  }
  createNewStrategy() {
    let site;
    if (this.state.status === PRIMARY) {
      site = this.props.data[this.props.map].primary;
    } else if (this.state.status === SECONDARY) {
      site = this.props.data[this.props.map].secondary;
    } else if (this.state.status === TERTIARY) {
      site = this.props.data[this.props.map].tertiary;
    } else {
      site = this.props.data[this.props.map].quaternary;
    }
    site.offense.push(newOffense);
    site.defense.push(newDefense);
    if (this.state.status === PRIMARY) {
      this.setState({
        stratIndex: site.offense.length - 1,
        primary: site,
        hasUpdated: true
      });
    } else if (this.state.status === SECONDARY) {
      this.setState({
        stratIndex: site.offense.length - 1,
        secondary: site,
        hasUpdated: true
      });
    } else if (this.state.status === TERTIARY) {
      this.setState({
        stratIndex: site.offense.length - 1,
        tertiary: site,
        hasUpdated: true
      });
    } else {
      this.setState({
        stratIndex: site.offense.length - 1,
        quaternary: site,
        hasUpdated: true
      });
    }
  }
  removeStrategy() {
    let site;
    if (this.state.status === PRIMARY) {
      site = this.state.primary;
    } else if (this.state.status === SECONDARY) {
      site = this.state.secondary;
    } else if (this.state.status === TERTIARY) {
      site = this.state.tertiary;
    } else {
      site = this.state.quaternary;
    }
    if (site.offense.length > 1) {
      if (confirm("You are about to delete this strategy. Are you sure?")) {
        site.offense.splice(this.state.stratIndex, 1);
        site.defense.splice(this.state.stratIndex, 1);
        if (this.state.status === PRIMARY) {
          this.setState({
            primary: site,
            hasUpdated: true,
            stratIndex: 0
          }, this.updateMap);
        } else if (this.state.status === SECONDARY) {
          this.setState({
            secondary: site,
            hasUpdated: true,
            stratIndex: 0
          }, this.updateMap);
        } else if (this.state.status === TERTIARY) {
          this.setState({
            tertiary: site,
            hasUpdated: true,
            stratIndex: 0
          }, this.updateMap);
        } else {
          this.setState({
            quaternary: site,
            hasUpdated: true,
            stratIndex: 0
          }, this.updateMap);
        }
      }
    } else {
      alert("This strategy is the only one that exists and cannot be deleted.");
    }
  }

  viewSites() {
    this.setState({
      status: SELECT,
      stratIndex: 0
    });
  }
  selectPrimary() {
    this.setState({
      status: PRIMARY,
      stratIndex: 0
    });
  }
  selectSecondary() {
    this.setState({
      status: SECONDARY,
      stratIndex: 0
    });
  }
  selectTertiary() {
    this.setState({
      status: TERTIARY,
      stratIndex: 0
    });
  }
  selectQuaternary() {
    this.setState({
      status: QUATERNARY,
      stratIndex: 0
    });
  }
  render() {
    switch (this.state.status) {
      case LOADING:
        return (
          <div className="loading"></div>
        );
        break;
      case SUCCESS:
        return (
          <div className="success">
            <h2 className="success-heading">Success</h2>
            <p className="success-description">The strategy for {MAP_REFERENCE[this.props.map]} has been updated.</p>
          </div>
        );
        break;
      case FAILURE:
        return (
          <div className="failure">
            The map strategy was not able to be updated. Please try again.
          </div>
        );
        break;
      case SELECT:
        return (
          <div className="map-edit">
            <div className="map-edit-heading">
              <h2 className="map-title">{MAP_REFERENCE[this.props.map]}</h2>
            </div>
            <div className="map-site-gallery">
              <h3 className="map-site-gallery-description">Objectives</h3>
              <button onClick={this.selectPrimary} className="map-site-button" id="primary-site">{this.props.data[this.props.map].primary.site}</button>
              <button onClick={this.selectSecondary} className="map-site-button" id="secondary-site">{this.props.data[this.props.map].secondary.site}</button>
              <button onClick={this.selectTertiary} className="map-site-button" id="tertiary-site">{this.props.data[this.props.map].tertiary.site}</button>
              <button onClick={this.selectQuaternary} className="map-site-button" id="quaternary-site">{this.props.data[this.props.map].quaternary.site}</button>
            </div>
          </div>
        )
        break;
      default:
        let site;
        if (this.state.status === PRIMARY) {
          site = this.state.primary;
        } else if (this.state.status === SECONDARY) {
          site = this.state.secondary;
        } else if (this.state.status === TERTIARY) {
          site = this.state.tertiary;
        } else {
          site = this.state.quaternary;
        }
        const stratIndex = this.state.stratIndex;
        const offensiveLineup = site.offense[stratIndex].operators.map((o, i) => {
          return (
            <div className="operator-edit">
              <h4 className="operator-edit-heading">Operator {i + 1}</h4>
              <div className="operator-name">
                <p className="operator-name-label">Name</p>
                <input onChange={() => this.editNames(event, "offense", i)} className="operator-name-edit" value={site.offense[stratIndex].operators[i]}/>
              </div>
              <div className="operator-role">
                <p className="operator-role-label">Role</p>
                <input onChange={() => this.editRoles(event, "offense", i)} className="operator-role-edit" value={site.offense[stratIndex].roles[i]}/>
              </div>
              <div className="operator-objective">
                <p className="operator-objective-label">Objective</p>
                <input onChange={() => this.editObjective(event, "offense", i)} className="operator-objective-edit" value={site.offense[stratIndex].objective[i]}/>
              </div>
            </div>
          )
        });
        const defensiveLineup = site.defense[stratIndex].operators.map((o, i) => {
          return (
            <div className="operator-edit">
              <h4 className="operator-edit-heading">Operator {i + 1}</h4>
              <div className="operator-name">
                <p className="operator-name-label">Name</p>
                <input onChange={() => this.editNames(event, "defense", i)} className="operator-name-edit" value={site.defense[stratIndex].operators[i]}/>
              </div>
              <div className="operator-role">
                <p className="operator-role-label">Role</p>
                <input onChange={() => this.editRoles(event, "defense", i)} className="operator-role-edit" value={site.defense[stratIndex].roles[i]}/>
              </div>
              <div className="operator-objective">
                <p className="operator-objective-label">Location</p>
                <input onChange={() => this.editLocations(event, "defense", i)} className="operator-objective-edit" value={site.defense[stratIndex].locations[i]}/>
              </div>
            </div>
          )
        });
        return (
          <div className="map-edit" id={this.props.map}>
            <button onClick={this.viewSites} className="map-site-return">View all objectives</button>
            <div className="map-site">
              <h2 className="map-title">{MAP_REFERENCE[this.props.map]}: {site.site}</h2>
              <StrategySelector stratIndex={this.state.stratIndex} length={site.offense.length} incrementStratIndex={this.incrementStrategyIndex} decrementStratIndex={this.decrementStrategyIndex}/>
              <button onClick={this.createNewStrategy} className="create-new-strat">Create New Strategy</button>
              <button onClick={this.removeStrategy} className="remove-strat">Delete Strategy</button>
              <div className="map-bans-edit">
                <h2 className="bans-heading">Bans</h2>
                <div className="ban">
                  <p className="ban-label">Attacker</p>
                  <input onChange={() => this.editBans(event, 0)} className="ban-edit" value={this.state.bans[0]}/>
                </div>
                <div className="ban">
                  <p className="ban-label">Defender</p>
                  <input onChange={() => this.editBans(event, 1)} className="ban-edit" value={this.state.bans[1]}/>
                </div>
              </div>
              <div className="map-offense">
                <h3 className="offense-heading">Offense</h3>
                <div className="offense-notes">
                  <p className="offense-notes-label">Offensive Strategy</p>
                  <textarea onChange={() => this.editNotes(event, "offense")} className="offense-notes-edit" value={site.offense[stratIndex].notes}></textarea>
                </div>
                <div className="operators">
                  { offensiveLineup }
                </div>
              </div>
              <div className="map-defense">
                <h3 className="defense-heading">Defense</h3>
                <div className="defense-notes">
                  <p className="defense-notes-label">Defensive Strategy</p>
                  <textarea onChange={() => this.editNotes(event, "defense")} className="defense-notes-edit" value={site.defense[stratIndex].notes}></textarea>
                </div>
                <div className="operators">
                  { defensiveLineup }
                </div>
              </div>
              { this.state.hasUpdated ? <button onClick={this.updateMap} className="update-map">Save Changes</button> : ""}
            </div>
          </div>
        )
        break;
    }
  }
}

export default MapEdit;
