import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class GuardiansPanel extends Component {

  _loadData() {
    const guardians = localStorage.guardians.split(',');
    guardians.forEach((g) => {
      const guardian = g.split(':')[0];
      const platform = g.split(':')[1].toString();
      this.props.guardians.add(guardian, platform);
    });
  }

  _saveData() {
    console.log(this.props.guardians.get.map((g) => g.displayName).join(','));
    localStorage.guardians = this.props.guardians.get.map((g) => `${g.displayName}:${g.membershipType}`).join(',');
  }

  render() {
    const emptyComment = (
      <p>
        Guardians will be shown here. You can also load your previouly saved list.
      </p>
    );

    const guardiansList = this.props.guardians.get.map(g => (
      <div key={g.membershipId} className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
        <div style={{ marginTop: '8px' }}>
          <div className="media">
            <div className="media-left">
              <a>
                <img className="media-object" src={`https://www.bungie.net${g.iconPath}`} alt="" />
              </a>
            </div>
            <div className="media-body">
              <h4 className="media-heading">{g.displayName}</h4>
              <p>ID: {g.membershipId}</p>
            </div>
          </div>
        </div>
      </div>
    ));

    const isSaveEnabled = (this.props.guardians.get.length > 0);
    const isLoadEnabled = (localStorage.guardians && localStorage.guardians.split(':').length > 1);

    return (
      <div className="row">
        <hr />
        {(!isSaveEnabled && !isLoadEnabled) ? '' :
        <div
          className="panel panel-default"
          style={{ marginLeft: '14px', marginRight: '14px' }}
        >
          <div className="panel-heading">
            Rivals
            <div
              className="btn-group pull-right"
              role="group"
              aria-label="..."
              style={{ marginTop: '-5px', marginRight: '-6px' }}
            >
              <button
                className={`btn btn-sm btn-default ${isSaveEnabled ? '' : 'disabled'}`}
                onClick={() => (isSaveEnabled ? this._saveData() : null)}
              >
                <span
                  className="glyphicon glyphicon-floppy-open"
                  aria-hidden="true"
                /> Save
              </button>
              <button
                className={`btn btn-sm btn-default ${isLoadEnabled ? '' : 'disabled'}`}
                onClick={() => (isLoadEnabled ? this._loadData() : null)}
              >
                <span
                  className="glyphicon glyphicon-save-file"
                  aria-hidden="true"
                /> Load
              </button>
            </div>
          </div>
          <div className="panel-body">
            {isSaveEnabled ? guardiansList : emptyComment}
          </div>
        </div>
      }
      </div>
    );
  }
}

GuardiansPanel.propTypes = {
  guardians: PropTypes.object
};
