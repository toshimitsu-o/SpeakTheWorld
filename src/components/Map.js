import React, { Component } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import * as gMap from "./googleMap.js";

const containerStyle = {
  position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
};

const center = {
  lat: -25.344, lng: 131.031
};

class Map extends Component {

  constructor(props) {
    super(props)


  }


  render() {
    return (
      <LoadScript
        googleMapsApiKey=""
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={3}
          onClick = {(e) => {
            gMap.geocodeing(e.latLng.toJSON(), this.props.setLang);
            this.props.show();
          }}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          <></>
        </GoogleMap>
      </LoadScript>
    )
  }
}
export default Map;