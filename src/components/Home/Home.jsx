import React from'react';
import homeStyle from './_home.scss';
import { Link, Route, Switch } from 'react-router-dom';
import LocationPanelContainer from '../../containers/LocationPanelContainer'

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="Home">
        <div className="Home-header">
          <img src={require('../../img/sun.svg')} className="Home-logo" alt="logo" />
          <span className="Home-font">Sunrise-Sunset</span>
        </div>
        <div className="Home-content">
            <LocationPanelContainer/>
        </div>
      </div>
    );
  }
};

export default Home;  