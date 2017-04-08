import React, { Component } from "react";

export default class GuardiansPanel extends Component {

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className="row">
				<hr />
				{this.props.guardians.get.map(g => {
					return (
						<div key={g.membershipId} className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
							<div style={{marginTop:"8px"}}>

									<div className="media">
										<div className="media-left">
											<a href="#">
												<img className="media-object" src={'https://www.bungie.net' + g.iconPath} />
											</a>
										</div>
										<div className="media-body">
											<h4 className="media-heading">{g.displayName}</h4>
											<p>ID: {g.membershipId}</p>
										</div>
									</div>
								
							</div>
						</div>
					)
					})}
			</div>
		)
	}

}