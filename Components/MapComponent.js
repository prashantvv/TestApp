import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';

import MapView from 'react-native-maps';
import { Marker,Polyline } from 'react-native-maps';
const {width, height} = Dimensions.get('window')
import MapViewDirections from 'react-native-maps-directions';
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO


const origin = {latitude:  24.5854, longitude: 73.7125};
const destination = {latitude: 37.406756, longitude: -122.4053769};


class MapComponent extends Component {
  constructor() {
    super()
    this.state = {
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      },
    }
  }


  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }

      this.setState({initialPosition: initialRegion})
    },
    (error) => alert(JSON.stringify(error)),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
  }


  renderScreen = () => {
      return (
        <View style={styles.container}>
          {/* <MapView
            style={styles.map}
            initialRegion={this.state.initialPosition}/> */}

   <MapView
 style={styles.map}
    initialRegion={{
      latitude: 24.5854,
      longitude: 73.7125,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  >  
  
  {/* <MapViewDirections
    origin={origin}
    destination={destination}
    strokeWidth={3}

    apikey={'AIzaSyDxGgK0XO8cTUQEQsikMRPgr5XYtoaCFj4'}
    
    strokeColor="hotpink"
  /> */}

  <Marker
      coordinate={{latitude: 24.5854,
      longitude: 73.7125}}
      title={'your location'}
     
    />

<Marker
      coordinate={{latitude: 37.406756,
      longitude: -122.109125}}
      title={'your location'}
     
    />

<Marker
      coordinate={{latitude: 26.916409,
      longitude: 70.808993}}
      title={'your location'}
     
    />


  </MapView>


{/* <MapView
  region={this.state.region}
  onRegionChange={this.onRegionChange}
>
  {this.state.markers.map(marker => (
    <Marker
      coordinate={marker.latlng}
      title={marker.title}
      description={marker.description}
    />
  ))}
</MapView> */}
        </View>
      );
  }

  render() {
    return (
      this.renderScreen()
    );
  }
}

const styles = StyleSheet.create({
  container: {
      position: 'absolute',
    height : SCREEN_HEIGHT,
    width : SCREEN_WIDTH,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default MapComponent;