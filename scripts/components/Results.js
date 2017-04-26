import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: window.innerWidth - 40
    };
  }

  componentDidMount() {
    this.setState({ width: this.r.offsetWidth });
    window.onresize = () => {
      this.setState({ width: this.r.offsetWidth });
    };
  }

  render() {
    return (
      <div ref={c => { this.r = c; }}>
        <div className="row">
          <div className="col-xs-12">
            <div className="panel panel-default">
              <div
                className="panel-heading"
                style={{ height: '55px' }}
              >
                <select
                  className="form-control pull-right"
                  onChange={(evt) => this.props.combo.set(evt.target.value)}
                >
                  {this.props.comboData.get.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div className="panel-body">
                <div className="row">
                  <BarChart
                    layout="vertical"
                    margin={{ top: 0, right: 35, bottom: -10, left: 60 }}
                    height={30 + (this.props.charting.data.length * 40)}
                    width={this.state.width}
                    data={this.props.charting.data}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Results.propTypes = {
  comboData: PropTypes.object,
  charting: React.PropTypes.object,
  combo: React.PropTypes.object
};
