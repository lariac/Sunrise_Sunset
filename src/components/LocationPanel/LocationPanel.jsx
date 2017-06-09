import React from 'react';
import locationPanelStyle from './_locationPanel.scss';
import { Link, Route, Switch } from 'react-router-dom';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: 'San Francisco, CA' }
    this.handleGetUserLocation = this.handleGetUserLocation.bind(this);
  //  this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }
  handleGetUserLocation() {
    this.props.getUserDefaultLocation();
  }
  /* handleSubmitForm(event){
     event.preventDefault()
     console.log("SET LOCATION!");
     this.props.setUserLocation();
   } */
  render() {
    return (
      <div className="location-Panel">
        <img src={require('../../img/planet-earth.svg')} className="location-Panel-image" alt="earth-image" />
        <div className="location-Information">
          <h2 className="location-Panel-font">Choose the settings of your location:</h2>
          <div className="LocationContainer">
            <button onClick={this.handleGetUserLocation} className="btn btn-default LocationContainerItems">From my location</button>
          </div>
          <div className="LocationContainer">
            Or
          </div>
          <div className="LocationContainer">
            <PlacesAutocomplete inputProps={this.props.inputPlaces} className="LocationContainerItems" />
            <button onClick={this.props.setUserLocation} className="removeButtonStyle"><img src={require('../../img/check.svg')} className="checkButton" /></button>
          </div>
        </div>
      </div>
    );
  }
};

export default Home;  