import React, { Component } from 'react';
import SearchBox from './SearchBox';

export default class SearchPanel extends Component {

	render() {
		return (

			<SearchBox 
				searchBoxValue={this.props.searchBoxValue}
				guardians={this.props.guardians} 
				stats={this.props.stats}
			/>

		)
	};


}

