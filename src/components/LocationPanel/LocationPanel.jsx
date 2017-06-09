import React from 'react';
import locationPanelStyle from './_locationPanel.scss';
import ModalCalendarContainer from '../../containers/ModalCalendarContainer';
import { Link, Route, Switch } from 'react-router-dom';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

class LocationPanel extends React.Component {
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
          <h2 className="location-Panel-font">Find the time for the next sunset & sunrise:</h2>
          <div className="LocationContainer">
          <Link to={'/Sunset_Sunrise_Calculator'}>
            <button onClick={this.handleGetUserLocation} className="btn btn-default LocationContainerItems">From my location</button>
           </Link>
          </div>
          <div className="LocationContainer">
            Or
          </div>
          <div className="LocationContainer">
            <PlacesAutocomplete inputProps={this.props.inputPlaces} className="LocationContainerItems" />
            
             <Link to={'/Sunset_Sunrise_Calculator'}>
            <button onClick={this.props.setUserLocation} className="removeButtonStyle"><img src={require('../../img/check.svg')} className="checkButton" /></button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

export default LocationPanel;  