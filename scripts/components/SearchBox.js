import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SearchBox extends Component {
  render() {
    return (
      <input
        type="text" className="form-control"
        onChange={(evt) => this.props.searchBoxValue.set(evt.target.value)}
        onKeyPress={(evt) => this.props.keyPress(evt)}
        value={this.props.searchBoxValue.get}
      />
    );
  }
}

SearchBox.propTypes = {
  searchBoxValue: PropTypes.object,
  keyPress: PropTypes.func
};
