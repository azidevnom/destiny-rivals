import React, { Component } from 'react';
import SearchPanel from './components/SearchPanel';
import GuardiansPanel from './components/GuardiansPanel';
import Results from './components/Results';

export default class App extends Component {

	constructor() {
		super()


		this.state = {
			searchBoxValue: '',
			comboValue: 'weaponKillsSuper',
			comboData: [],
			enableResults: false,
			guardians: [],
			guardiansData: {},
			chartData: []
		}

		const headers = new Headers();
		headers.append('X-API-KEY', '441713dac45343f29bdaf39dbe38a97d');

		this.api = {
			config: { method: 'GET', headers },
			resources: {
				search(platform, name) { return `https://www.bungie.net/Platform/Destiny/SearchDestinyPlayer/${platform}/${name}/` },
				summary(platform, membershipId) { return `https://www.bungie.net/Platform/Destiny/${platform}/Account/${membershipId}/Summary/` },
				stats(platform, membershipId) { return `https://www.bungie.net/Platform/Destiny/Stats/Account/${platform}/${membershipId}/` },
			}
		}
	}

	_addNewGuardian(data) {

		this.setState({searchBoxValue:''})
		if (data.trim().length > 0) {
			if (this.state.guardians.filter(item => (item.displayName.toLowerCase() == data.toLowerCase())).length == 0) {

				fetch(new Request(this.api.resources.search(2, data), this.api.config)).then(r => r.json())
				.then(json => {
					
					if (json.ErrorCode == 1 && json.Response.length > 0) {
						
						let g = json.Response[0];

						this.setState({
							guardians: [...this.state.guardians, g]
						}, () => {

							fetch(new Request(this.api.resources.stats(2, g.membershipId), this.api.config)).then(r => r.json())
							.then(json => {

								console.log(g.displayName)

								this.setState({
									guardiansData: {
										...this.state.guardiansData, 
										[g.displayName]:json.Response.mergedAllCharacters.results.allPvP.allTime
									},
									enableResults: true
								}, () => {

									if (Object.keys(this.state.guardiansData).length == 1) {

										let firstGuardian = Object.keys(this.state.guardiansData)[0];
										this.setState({'comboData': Object.keys(this.state.guardiansData[firstGuardian])});
										
									}

									console.log("try")
									this._generateChart()

								})
							})
						})

					} else {
						alert("Guardian not found")
					}

				});
			} else {
				alert("Guardian " + data + " is already registered.")
			}
		}		
	}

	_bringStats() {
		console.log("getting stats")
		Promise.all(this.state.guardians.map(g => {
			return fetch(new Request(this.api.resources.stats(2, g.membershipId), this.api.config)).then(r => r.json())
			.then(json => {
				this.setState({guardiansData: {...this.state.guardiansData, [g.displayName]:json.Response.mergedAllCharacters.results.allPvP.allTime}})
			})
		})).then(() => {
			console.log("completed")
			this.setState({ enableResults: true })
		})

	}

	_generateChart() {

		console.log("generating chart")

		let dataArray = Object.keys(this.state.guardiansData).map(g => {
			return {
				name: g,
				value: this.state.guardiansData[g][this.state.comboValue].basic.value
			}
		})

		dataArray = dataArray.sort((a,b) => b.value - a.value)

		this.setState({chartData: dataArray})

	}

	render() {

		let searchBoxValue = {
			get:this.state.searchBoxValue, 
			set:(v) => {this.setState({searchBoxValue:v})}
		}

		let guardians = {
			get: this.state.guardians,
			add:(g) => {this._addNewGuardian(g)}
		}

		let stats = {
			run:() => {this._bringStats()}
		}

		let combo = {
			get: this.state.comboValue,
			set: (v) => {
				this.setState({comboValue:v}, () => this._generateChart())
			}
		}

		let comboData = {
			get: this.state.comboData
		}

		let charting = {
			generate: () => { this._generateChart() },
			data: this.state.chartData
		}

		let results = (this.state.enableResults) ? <Results comboData={comboData} combo={combo} charting={charting} /> : '';

		return (
			<div className="container">
				<div className="row">
					<div className="col-xs-12 col-md-3">
						<h2>Destiny Rivals</h2>
					</div>
					<div className="col-xs-12 col-md-9">
						<div className="visible-md visible-lg">
							<div style={{height:"20px"}} />
						</div>
						<SearchPanel 
							searchBoxValue={searchBoxValue}
							guardians={guardians}
							stats={stats}
						/>
					</div>
				</div>
				<GuardiansPanel
					guardians={guardians}
				/>

				{results}
			</div>
		);
	}
}
