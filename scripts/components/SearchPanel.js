import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchBox from './SearchBox';

export default class SearchPanel extends Component {

  _keyPress(evt) {
    if (evt.key === 'Enter') {
      this.props.guardians.add(this.props.searchBoxValue.get);
    }
  }

  render() {
    return (
      <div className="input-group">
        <div className="input-group-btn" data-toggle="buttons">
          <label className={`btn btn-default ${this.props.platform.get === '1' ? 'active' : ''}`} htmlFor="xbox">
            <input
              type="radio"
              name="platform"
              id="xbox"
              value="1"
              onClick={(evt) => this.props.platform.set(evt.target.value)}
            />
            <img style={{ height: '20px' }} src="xbl.png" alt="xbox" />
          </label>
          <label className={`btn btn-default ${this.props.platform.get === '2' ? 'active' : ''}`} htmlFor="psn">
            <input
              type="radio"
              name="platform"
              id="psn"
              value="2"
              onClick={(evt) => this.props.platform.set(evt.target.value)}
            />
            <img style={{ height: '20px' }} src="psn.png" alt="psn" />
          </label>
        </div>
        <SearchBox
          searchBoxValue={this.props.searchBoxValue}
          keyPress={this._keyPress.bind(this)}
        />
        <div className="input-group-btn">
          <button
            className="btn btn-primary"
            onClick={() => this._keyPress({ key: 'Enter' })}
          >
            <span
              style={{ height: '18px' }}
              className="glyphicon glyphicon-search"
              aria-hidden="true"
            /> Seach
          </button>
        </div>
      </div>
    );
  }
}

SearchPanel.propTypes = {
  searchBoxValue: PropTypes.object,
  guardians: PropTypes.object,
  platform: PropTypes.object
};

