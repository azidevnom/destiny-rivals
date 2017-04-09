import React, { Component } from 'react';
import SearchBox from './SearchBox';

export default class SearchPanel extends Component {

	constructor(props) {
		super(props)
	}

	_keyPress(evt) {
		if (evt.key == 'Enter') {
			this.props.guardians.add(this.props.searchBoxValue.get)
		}
	}

	_loadData() {
		console.log("loading")
		const guardians = localStorage.guardians.split(",")
		guardians.forEach((g) => this.props.guardians.add(g))
	}

	_saveData() {
		console.log(this.props.guardians.get.map((g) => g.displayName).join(","));
		localStorage.guardians = this.props.guardians.get.map((g) => g.displayName).join(",")
	}

	render() {
		return (
			<div className="input-group">
				<SearchBox 
					searchBoxValue={this.props.searchBoxValue} 
					keyPress={this._keyPress.bind(this)}
				/>
				<div className="input-group-btn">
					<button className="btn btn-primary" 
						onClick={() => this._keyPress({key:'Enter'})}>
						Search
					</button>
					<button className="btn btn-default"
						onClick={() => this._saveData()}>
						Save
					</button>
					<button className="btn btn-default"
						onClick={() => this._loadData()}>
						Load
					</button>
				</div>
			</div>

		)
	};


}

