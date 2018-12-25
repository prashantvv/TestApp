import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';

import Mapv from 'react-native-maps';

const {width, height} = Dimensions.get('window')

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class MapComponent extends Component {
    constructor(props) {
        super(props);
        this.setState({
            latitude,
            longitude,
            routeCoordinates: routeCoordinates.concat([newCoordinate]),
            distanceTravelled: distanceTravelled + this.calcDistance(newCoordinate),
            prevLatLng: newCoordinate
          });
      }

      componentDidMount() {
        this.watchID = navigator.geolocation.watchPosition(
          position => {
            const { coordinate, routeCoordinates, distanceTravelled } =   this.state;
            const { latitude, longitude } = position.coords;
            
            const newCoordinate = {
              latitude,
              longitude
            };
            if (Platform.OS === "android") {
              if (this.marker) {
                this.marker._component.animateMarkerToCoordinate(
                  newCoordinate,
                  500
                );
               }
             } else {
               coordinate.timing(newCoordinate).start();
             }
             this.setState({
               latitude,
               longitude,
               routeCoordinates: routeCoordinates.concat([newCoordinate]),
               distanceTravelled:
               distanceTravelled + this.calcDistance(newCoordinate),
               prevLatLng: newCoordinate
             });
           },
           error => console.log(error),
           { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
      }


  renderScreen = () => {
      return (
        <MapView
        style={styles.map}
        showUserLocation
        followUserLocation
        loadingEnabled
        region={this.getMapRegion()}
      >
        <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} />
        <Marker.Animated
          ref={marker => {
            this.marker = marker;
          }}
          coordinate={this.state.coordinate}
        />
      </MapView>
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

export default Mapv;