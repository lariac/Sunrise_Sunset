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
      address: 'Tres Ríos, Cartago',
      timeZoneID: "",
      timeZoneOffset: 0,
      sunriseHour: 0,
      sunsetHour: 0
    }
    this.onChangeInput = this.onChangeInput.bind(this);
    this.setUserLocation = this.setUserLocation.bind(this);
    this.getUserDefaultLocation = this.getUserDefaultLocation.bind(this);
    this.searchUTC = this.searchUTC.bind(this);
    this.getSunsetSunriseHour = this.getSunsetSunriseHour.bind(this);
  }

  getTimeZone(latitude, longitude, timeStamp) {
    const self = this;
    console.log("GET TIME ZONE!!");
    axios.get(constants.GOOGLE_API_URL_TIMEZONE + 'location=' + latitude + ',' + longitude + '&timestamp=1331161200&key=AIzaSyCCE0bRpjEv8602wKpgvHx7xQmXPUu76Dk').then((response) => {
      self.state.timeZoneID = response.data.timeZoneId;

      //searchUTC according to the timeZoneId
      self.searchUTC(self.state.timeZoneID);

      //Get sunset-sunrise hour
      self.getSunsetSunriseHour();

    });
  }

  getSunsetSunriseHour() {

    const self = this;
    axios.get(constants.SUNRISE_SUNSET_API_URL + "lat=" + this.state.latitude + "&lng=" + this.state.longitude).then((response) => {
      console.log(response);
      self.setHourTimeZone(response.data.results.sunrise, response.data.results.sunset);
      //  console.log("sunrise es: " + this.state.sunriseHour + "sunset: " + this.state.sunsetHour);
    }).catch((error) => {
      console.log("Error es: " + error);
    });
  }

  setHourTimeZone(sunriseHour, sunsetHour) {
    console.log("sunrise es: " + sunriseHour + "sunset: " + sunsetHour);
    let sunriseHourSplit = this.splitHour(sunriseHour);
    let sunsetHourSplit = this.splitHour(sunsetHour);

    if (this.state.timeZoneOffset > 0) {
      //Set the sunrise
      this.state.sunriseHour = (sunriseHourSplit[0] + this.state.timeZoneOffset) + ":" + sunriseHourSplit[1] + ":" + sunriseHourSplit[2] + " AM";
      console.log("Hora del SUNRISE OFICIAL: " + this.state.sunriseHour);

      //Set the sunset
      this.state.sunsetHour = (sunsetHourSplit[0] + this.state.timeZoneOffset) + ":" + sunsetHourSplit[1] + ":" + sunsetHourSplit[2] + " PM";
      console.log("Hora del SUNSET OFICIAL: " + this.state.sunsetHour);
    }
    else {
      let timeZoneOffset = Math.abs(this.state.timeZoneOffset);

      //Set the sunrise
      this.state.sunriseHour = Math.abs((sunriseHourSplit[0] - timeZoneOffset)) + ":" + sunriseHourSplit[1] + ":" + sunriseHourSplit[2] + " AM";
      console.log("Hora del SUNRISE OFICIAL: " + this.state.sunriseHour);

      //Set the sunset
      this.state.sunsetHour = Math.abs((sunsetHourSplit[0] - timeZoneOffset)) + ":" + sunsetHourSplit[1] + ":" + sunsetHourSplit[2] + " PM";
      console.log("Hora del SUNSET OFICIAL: " + this.state.sunsetHour);
    }

  }

  splitHour(time) {
    let strDate = time;
    let arr = strDate.split(':');
    let hour = [];
    hour[0] = parseInt(arr[0]);
    hour[1] = parseInt(arr[1]);
    hour[2] = parseInt(arr[2]);
    return hour;
  }

  searchUTC(timeZoneId) {

    let timeZoneIdLocated = false;
    var counterTimeZones = 0;
    let counterUTC = 0;
    console.log("cuantos objetos hay: " + timeZones.timeZonesList.length);
    console.log("timeZoneId es: " + timeZoneId);
    while (counterTimeZones < timeZones.timeZonesList.length && timeZoneIdLocated === false) {
      counterUTC = 0;
      //console.log(timeZones.timeZonesList[counterTimeZones]);
      // console.log("el tama;o es: " + timeZones.timeZonesList[counterTimeZones].utc.length );
      while (timeZones.timeZonesList[counterTimeZones].utc != undefined && counterUTC < timeZones.timeZonesList[counterTimeZones].utc.length && timeZones.timeZonesList[counterTimeZones].utc[counterUTC] != timeZoneId) {
        ++counterUTC;
      }

      if (timeZones.timeZonesList[counterTimeZones].utc != undefined && counterUTC < timeZones.timeZonesList[counterTimeZones].utc.length) {
        timeZoneIdLocated = true;
        this.state.timeZoneOffset = timeZones.timeZonesList[counterTimeZones].offset;
        console.log("El timeZoneOffset es: " + this.state.timeZoneOffset);
      }
      else {
        timeZoneIdLocated = false;
      }

      ++counterTimeZones;
    }
  }

  toTimestamp(strDate) {
    var datum = Date.parse(strDate);
    console.log("datum es: " + datum / 1000);
    return datum / 1000;
  }

  getActualDay() {
    let currentdate = new Date();
    let datetime = currentdate.getDate() + "/"
      + (currentdate.getMonth() + 1) + "/"
      + currentdate.getFullYear();

    return datetime;
  }

  getUserDefaultLocation() {
    const self = this;
    navigator.geolocation.getCurrentPosition(function (position) {
      self.state.latitude = position.coords.latitude;
      self.state.longitude = position.coords.longitude;

      //Set the data necessary to query the time zone of a place according to its latitude and longitude
      self.setTimeZoneData();
    },
      function (failure) {
        if (failure.message.indexOf("Only secure origins are allowed") == 0) {
          // Chrome 50+, no HTTP domain.
        }
      }
    )
  }

  setTimeZoneData() {
    //Get the actual day details (Day, month, year)
    let actualDay = this.getActualDay();
    console.log("el dia de hoy es: " + actualDay);

    //Convert the day details to timeStamp
    let timeStamp = this.toTimestamp(actualDay);
    console.log("time stamp es: " + timeStamp);

    //Set the timeZone according to the latitude and longitude coordinates
    this.getTimeZone(this.state.latitude, this.state.longitude, timeStamp);

  }


  setUserLocation() {
    const self = this;
    console.log("state es: " + this.state.address);
    geocodeByAddress(self.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        self.state.latitude = latLng.lat,
          self.state.longitude = latLng.lng

        //Set the data necessary to query the time zone of a place according to its latitude and longitude
        self.setTimeZoneData();

        console.log("latitud es: " + self.state.latitude + self.state.longitude);
      })
      .catch(error => console.error('Error', error))
  }

  onChangeInput(inputAddress) {
    this.setState({ address: inputAddress })
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