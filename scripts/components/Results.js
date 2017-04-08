import React, { Component } from "react";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from "recharts";

export default class Results extends Component {
	constructor(props) {
		super(props)

		this.state = {
			width: window.innerWidth - 40
		}
	}

	componentDidMount() {
		this.setState({width: this.refs.root.offsetWidth})
		window.onresize = () => {
		 this.setState({width: this.refs.root.offsetWidth}); 
		};
	}

	render() {

		return (
			<div ref="root">
				<div className="row">
					<hr />
					<div className="col-xs-12">
						<div className="input-group">
							<div className="input-group-btn">
								<button className="btn" disabled={true} onClick={this.props.charting.generate}>{">"}</button>
							</div>
							<select className="form-control" onChange={(evt) => this.props.combo.set(evt.target.value)}>
								{this.props.comboData.get.map(o => <option key={o} value={o}>{o}</option>)}
							</select>
						</div>
					</div>
				</div>
				<div className="row">
					<BarChart
						layout="vertical"
						margin={{top: 40, right: 0, bottom: 30, left: 60}}
						height={100 + (this.props.charting.data.length *40)}
						width={this.state.width}
						data={this.props.charting.data}>
							<CartesianGrid strokeDasharray="3 3"/>
							<XAxis type="number"/>
							<YAxis dataKey="name" type="category"/>
							<Tooltip />
							<Bar dataKey="value" fill="#8884d8" />
					</BarChart>
				</div>

			</div>
		)
	}
}