import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import sunriseSunsetStyle from './_sunriseSunset.scss'


class SunriseSunset extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="sunriseSunsetContainer">
        <div className="sunriseContainer">
          <div className="sunriseAnimationContainer">
            <img src={require('../../img/mountain.svg')} className="mountainSunrise" alt="mountain image" />
            <img src={require('../../img/cloud.svg')} className="cloudSunrise" alt="cloud image" />
            <img src={require('../../img/sunImage.svg')} className="sunSunrise" alt="sun image" />
          </div>
           <div className="sunriseDataContainer">
          </div>
        </div>
        <div className="sunsetContainer">
          <div className="sunsetAnimationContainer">
             <img src={require('../../img/mountain.svg')} className="mountainSunset" alt="mountain image" />
            <img src={require('../../img/cloud.svg')} className="cloudSunset" alt="cloud image" />
            <img src={require('../../img/sunImage.svg')} className="sunSunset" alt="sun image" />
          </div>
          <div className="sunsetDataContainer">
          </div>
        </div>
      </div>

    );
  }
};

export default SunriseSunset;  