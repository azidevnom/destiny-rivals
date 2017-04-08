import React, { Component } from 'react';

export default class SearchBox extends Component {

	constructor(props) {
		super(props);

	}

	_keyPress(evt) {
		if (evt.key == 'Enter') {
			this.props.guardians.add(this.props.searchBoxValue.get)
		}
	}

	render() {
		return (
			<div className="input-group">
				<input type="text" className="form-control"
					onChange={(evt) => this.props.searchBoxValue.set(evt.target.value)} 
					onKeyPress={(evt) => this._keyPress(evt)} 
					value={this.props.searchBoxValue.get} 
				/>
				<div className="input-group-btn">
					<button className="btn btn-primary" 
						onClick={() => this._keyPress({key:'Enter'})}>
						Search
					</button>
					
				</div>
			</div>
		)
	}

}