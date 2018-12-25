import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Dashboard from './Components/Dashboard';
import MapView from 'react-native-maps';
import MapComponent from './Components/MapComponent';
import Mapv from './Components/Mapv';

export default class App extends React.Component {
  render() {
    return (

     <View>
      <Dashboard></Dashboard>
     </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',  
    alignItems: 'center',  
    justifyContent: 'center',
  },
});
