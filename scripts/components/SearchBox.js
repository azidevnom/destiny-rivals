import React, { Component } from 'react';

export default class SearchBox extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<input type="text" className="form-control"
				onChange={(evt) => this.props.searchBoxValue.set(evt.target.value)} 
				onKeyPress={(evt) => this.props.keyPress(evt)} 
				value={this.props.searchBoxValue.get} 
			/>	
		)
	}

}