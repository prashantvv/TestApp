import React from 'react';
import { StyleSheet, Text, View, FlatList ,Alert,
  ActivityIndicator, SafeAreaView,TextInput,
  Platform ,StatusBar ,TouchableOpacity} from 'react-native';
import { List, ListItem } from "react-native-elements";

import Icon from "react-native-vector-icons/Ionicons";
import MapComponent from './MapComponent';

CONSTANTS = require('../CONSTANTS');

<Icon
  name={Platform.OS === "ios" ? "ios-add" : "md-add"}
  color="#ccc"
  size={25}
/>


export default class Dashboard extends React.Component {

constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false
    };
  }




  componentDidMount() {
    this.makeRemoteRequest();
  }


  //API call
  makeRemoteRequest = () => {

    this.setState({ loading: true });
    fetch(CONSTANTS.API_URL) 
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res,
          error: res.error || null,
          loading: false,
          refreshing: false,
          showsrchbox:false,
          showmap:false,

          text:''
        });
      })
      .catch(error => {
        this.setState({  loading: false });
      });
  };


  //searchfunc()
  searchFilterFunction = text => {    
    const newData = this.state.data.filter(item => {      
      const itemData = `${item.city}   
      ${item.country} ${item.name}`;
       const textData = text.toUpperCase();
        
       return itemData.indexOf(textData) > -1;    
    });    
    this.setState({ data: newData });  
  };



  //view
  render() {
    return (

      <View style={[flex=1,width='100%']}>
      <View style={[flex=1,width='100%',paddingLeft= 20,paddingRight=20 ,]}>
        <View style={{marginTop:20,padding:20,backgroundColor:'white'}}>
               {  this.state.showsrchbox &&   
                  <View style={{flexDirection: 'row', justifyContent: 'space-between',marginBottom:-20}}>
                   <TextInput
                    placeholder="Search"
                    style={{   paddingLeft:10,paddingRight:10,height: 30, borderColor: 'gray', borderWidth: 1, width:'80%', borderRadius:10}}
                    onChangeText={(text) => this.searchFilterFunction(text)}
                    // value={this.state.text}
                  />
                       <Text style={{textAlignVertical:'center',}}   onPress={() => {
                                  this.setState({ showsrchbox:false}, () => { this.makeRemoteRequest(); });
                                  }}>Cancel</Text>
                  </View>
                
                }
             
               { !this.state.showsrchbox &&    
                        <View style={{flexDirection: 'row', justifyContent: 'space-between',marginBottom:-20}}>
               

                          <TouchableOpacity    onPress={() => {
                                              this.setState({showsrchbox:true})
                                              }} >
                                           <Icon
                                            name={ "md-search"}
                                            color="#ccc"
                                            size={30}
                                          />
                            </TouchableOpacity>
                                <Text style={{alignSelf:'center'}}>LOCATIONS</Text>
                                
                                <Text  style={{alignSelf:'center'}}
                                onPress={() => {
                                           this.setState({showmap:!this.state.showmap})
                                         }} >{ this.state.showmap ? 'ListView':'MapView' }</Text>
                          </View>
                  }
              
               </View>
           
              {
                this.state.showmap && <View style={{marginTop:20}}>
                        <MapComponent></MapComponent>
                </View>
              }

             { !this.state.showmap && <List  style={{backgroundColor:"grey",marginTop:-30}}>
                    <FlatList 
                    keyExtractor={(item, index) => item.post_code}
                      data={this.state.data}
                      renderItem={({item}) => 
                      <View style={styles.view}>
                          <Text style={{ fontSize: 20}}>{item.city}, {item.country}</Text>
                          <View style={{
                              flex: 1,
                              flexDirection: 'row',
                              marginTop:-20,
                              justifyContent: 'flex-end',
                              }}>
                                       <Icon
                                        name={ "ios-arrow-forward"}
                                        color="#ccc"
                                        size={25}
                                      />
                            </View>
                         
                          <Text>{item.address}</Text>

                          <View style={{flexDirection:'row',marginTop:20}}>
                          <View style={{flexDirection:'row'}}>
                            
                            <Text style={styles.txt_border} >WiFi</Text>
                            <Text style={[styles.txt_border,{marginLeft:20}]} >PARKING</Text>
                            <Text style={[styles.txt_border,{marginLeft:20}]} >CHARGER</Text>
                            </View>
                          </View>
                          <View style={{height:0.5,backgroundColor:'black',marginTop:10}}></View>
                      </View>
                  }

                    />
                    </List> }

                   
                    
      </View>

{ this.state.loading &&
  <View   style={{justifyContent:'center',alignContent:'center',alignItems:'center'}} >
   <ActivityIndicator size="large"  />
   </View>
 }
  
 </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
 

    width:'100%',
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text_style:{padding:10},
  view:{margin:10},
  txt_border: {
    borderColor: 'grey',
    padding:5,
    borderRadius: 10,
    borderWidth: 1
},
loading: {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  alignItems: 'center',
  justifyContent: 'center'
}

});
