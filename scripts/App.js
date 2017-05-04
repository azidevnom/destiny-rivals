import React, { Component } from 'react';
import State from './components/State';
import { addNewGuardian, generateChart } from './components/Core';
import SearchPanel from './components/SearchPanel';
import GuardiansPanel from './components/GuardiansPanel';
import Results from './components/Results';

export default class App extends Component {

  constructor() {
    super();
    this.state = State;
  }

  componentDidMount() {
    const currentURL = location.href.toString();
    if (currentURL.includes('%7C')) {
      location.replace(currentURL.split('%7C').join('|'));
      return null;
    }
    if (currentURL.includes('?rivals=')) {
      const rivals = currentURL.split('?rivals=')[1].split('|');
      rivals.forEach(rival => {
        const [guardian, platform] = rival.split(':');
        if (guardian && platform) {
          addNewGuardian(this, guardian, platform);
        }
      });
    }
  }

  render() {
    const searchBoxValue = {
      get: this.state.searchBoxValue,
      set: (v) => { this.setState({ searchBoxValue: v }); }
    };

    const guardians = {
      get: this.state.guardians,
      add: (data, platform = this.state.platformSelected) => { addNewGuardian(this, data, platform); }
    };

    const combo = {
      get: this.state.comboValue,
      set: (v) => {
        this.setState({ comboValue: v }, () => generateChart(this));
      }
    };

    const comboData = {
      get: this.state.comboData
    };

    const charting = {
      generate: () => { generateChart(this); },
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
