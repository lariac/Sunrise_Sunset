import React from 'react';
import LocationPanel from '../components/LocationPanel/LocationPanel';
import axios from 'axios';
import * as constants from '../constants/constants';
import * as timeZones from '../timeZones'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

class LocationPanelContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: "",
      longitude: "",
      address: 'Tres Ríos, Cartago'
    }
    this.onChangeInput = this.onChangeInput.bind(this);
    this.setUserLocation = this.setUserLocation.bind(this);
    this.getUserDefaultLocation = this.getUserDefaultLocation.bind(this);
  }

  getTimeZone(latitude, longitude){
   
  axios.get(constants.GOOGLE_API_URL_TIMEZONE+'location='+ latitude+','+longitude+'&timestamp=1331161200&key=AIzaSyCCE0bRpjEv8602wKpgvHx7xQmXPUu76Dk').then((response) => {
      console.log('GOOGLE API!!!!');
      console.log(response);

    });
  }

  toTimestamp(strDate){
   var datum = Date.parse(strDate);
   console.log("datum es: " + datum/1000);
   return datum/1000;
}

  getUserDefaultLocation() {
    const self = this;
    navigator.geolocation.getCurrentPosition(function (position) {
      self.state.latitude = position.coords.latitude;
      self.state.longitude = position.coords.longitude;

      //Set the timeZone according to the latitude and longitude coordinates
      self.getTimeZone(self.state.latitude, self.state.longitude );
    },
      function (failure) {
        if (failure.message.indexOf("Only secure origins are allowed") == 0) {
          // Chrome 50+, no HTTP domain.
        }
      }
    )
  }

  setUserLocation() {
    console.log("state es: " + this.state.address);
    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.state.latitude = latLng.lat,
        this.state.longitude = latLng.lng
        console.log("latitud es: " + this.state.latitude +  this.state.longitude );
      })
      .catch(error => console.error('Error', error))
  }

  onChangeInput(inputAddress) {
    this.setState({ address: inputAddress })
  }

  getSunsetSunriseHour(){

  }

  render() {
    const inputPlaces = {
      value: this.state.address,
      onChange: this.onChangeInput
    }
    return (
      <LocationPanel
        getUserDefaultLocation={this.getUserDefaultLocation}
        setUserLocation={this.setUserLocation}
        inputPlaces={inputPlaces}
      />
    );
  }
};

export default LocationPanelContainer;  