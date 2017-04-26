import React, { Component } from 'react';
import Api from './components/Api';
import State from './components/State';
import SearchPanel from './components/SearchPanel';
import GuardiansPanel from './components/GuardiansPanel';
import Results from './components/Results';

export default class App extends Component {

  constructor() {
    super();
    this.state = State;
  }

  addNewGuardian(data, platform) {
    this.setState({ searchBoxValue: '' });

    const isTextEmpty = (data.trim().length === 0);
    const isGuardianAlreadyRegistered = this.state.guardians.filter(item => (
      ((item.displayName.toLowerCase() === data.toLowerCase()) && (item.membershipType.toString() === platform))
    )).length > 0;

    if (isTextEmpty) return null;
    if (isGuardianAlreadyRegistered) return alert(`Guardian ${data} is already registered.`);

    const searchRequest = new Request(Api.resources.search(platform, data), Api.config);

    fetch(searchRequest).then(r => r.json()).then(json => {
      const responseHasContent = (json.Response.length > 0);
      const responseHasGuardian = (json.ErrorCode === 1);

      if (!(responseHasGuardian && responseHasContent)) return alert(`Guardian not found ${data} ${platform}`);

      const guardian = json.Response[0];
      this.setState({
        guardians: [...this.state.guardians, guardian]
      }, () => {
        const statsRequest = new Request(Api.resources.stats(guardian.membershipType, guardian.membershipId), Api.config);

        fetch(statsRequest).then(r => r.json()).then(stats => {
          this.setState({
            guardiansData: {
              ...this.state.guardiansData,
              [guardian.displayName]: stats.Response.mergedAllCharacters.results.allPvP.allTime
            },
            enableResults: true
          }, () => {
            const isComboDataNeeded = (Object.keys(this.state.guardiansData).length === 1);

            if (isComboDataNeeded) {
              const firstGuardian = Object.keys(this.state.guardiansData)[0];
              const comboKeys = Object.keys(this.state.guardiansData[firstGuardian])
              .sort((a, b) => (a > b ? 1 : -1));

              // removing unused entries
              comboKeys.splice(comboKeys.indexOf('weaponBestType'), 1);
              comboKeys.splice(comboKeys.indexOf('weaponKillsSubmachinegun'), 1);
              comboKeys.splice(comboKeys.indexOf('averageDeathDistance'), 1);
              comboKeys.splice(comboKeys.indexOf('totalDeathDistance'), 1);

              this.setState({ comboData: comboKeys });
            }

            this.generateChart();
          });
        });
      });
    });
  }

  generateChart() {
    let dataArray = Object.keys(this.state.guardiansData).map(g => (
      {
        name: g,
        value: this.state.guardiansData[g][this.state.comboValue].basic.value
      }
    ));
    dataArray = dataArray.sort((a, b) => b.value - a.value);
    this.setState({ chartData: dataArray });
  }

  render() {
    const searchBoxValue = {
      get: this.state.searchBoxValue,
      set: (v) => { this.setState({ searchBoxValue: v }); }
    };

    const guardians = {
      get: this.state.guardians,
      add: (data, platform = this.state.platformSelected) => { this.addNewGuardian(data, platform); }
    };

    const combo = {
      get: this.state.comboValue,
      set: (v) => {
        this.setState({ comboValue: v }, () => this.generateChart());
      }
    };

    const comboData = {
      get: this.state.comboData
    };

    const charting = {
      generate: () => { this.generateChart(); },
      data: this.state.chartData
    };

    const platform = {
      get: this.state.platformSelected,
      set: (v) => {
        this.setState({ platformSelected: v });
      }
    };

    const appDescription = (
      <div className="panel panel-default">
        <div className="panel-body">
          <p>
            This tool is open-source and you can check it, fork it or star it on github right <a href="https://github.com/azidevnom/destiny-rivals/">here</a>.
          </p>
          <p>
            You can also follow me on twitter as <a href="https://twitter.com/azidevnom">@azidevnom</a>.
          </p>
        </div>
      </div>
    );

    const results = (this.state.enableResults) ? (
      <Results
        comboData={comboData}
        combo={combo}
        charting={charting}
      />
     ) : '';


    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-3">
            <h2>Destiny Rivals</h2>
          </div>
          <div className="col-xs-12 col-md-9">
            <div className="visible-md visible-lg">
              <div style={{ height: '20px' }} />
            </div>
            <SearchPanel
              searchBoxValue={searchBoxValue}
              guardians={guardians}
              platform={platform}
            />
          </div>
        </div>
        <GuardiansPanel
          guardians={guardians}
        />

        {results}
        {appDescription}

      </div>
    );
  }
}
