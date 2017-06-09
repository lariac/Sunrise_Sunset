import React from 'react';
import FormSetLocation from '../components/FormSetLocation/FormSetLocation';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'


class FormSetLocationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: 'Tres Rios, Cartago' }
    this.onChangeInput =  this.onChangeInput.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }


  formSubmit(){
    console.log("state es: " + this.state.address);
    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  }
  onChangeInput(inputAddress){
    this.setState({ address: inputAddress })
  }
  render() {
    const inputPlaces2 = {value: this.state.address,
      onChange: this.onChangeInput}
 
    return (
      <FormSetLocation
        formSubmit={this.formSubmit}
        inputPlaces = {inputPlaces2}
      />
    );
  }
};

export default FormSetLocationContainer;  