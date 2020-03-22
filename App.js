import React from 'react';
import { StyleSheet, Text, View, FlatList, Image,ActivityIndicator } from 'react-native';
import {Card, CardItem,Container, Header, Left, Body, Right, Title} from "native-base";

export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state={
      isLoading:true,
      dataSource:[]
    }
  }

  getUserFromApi=()=>{
    return fetch("https://randomuser.me/api/?results=50")
      .then(response=>response.json())
      .then(responseJson=>{
        this.setState({
          isLoading:false,
          dataSource:this.state.dataSource.concat(responseJson.results)
        })
      })
      .catch(error=>{
        console.log(error)
      })
    
  }
  _keyExtractor=(datasource,index)=>datasource.email
  componentDidMount(){
    this.getUserFromApi()
  }
  componentWillMount(){
    Expo.Font.loadAsync({
      Roboto:require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium:require('native-base/Fonts/Roboto_medium.ttf'),
    })
  }
  render(){
    if(this.state.isLoading){
      return(
        <View style={styles.progress}>
          <ActivityIndicator
          size="large" 
          color="#01CBC6"
          />
        </View>
      )
    }
    return (
      <View>
      <Header style={{height:80}}>
          
          <Body >
            <Title style={{marginTop:40}}>Header</Title>
          </Body>
          
        </Header>
      <FlatList
      data={this.state.dataSource}
      keyExtractor={this._keyExtractor}
      renderItem={({item})=>(
        <Card>
          <CardItem>
            <View style={styles.container}>
              <Image
              style={styles.profilePic}
              source={{uri:item.picture.medium}}
              />
            </View>
            <View style={styles.userInfo}>
              <Text>
                Name: {item.name.title} {item.name.first} {item.name.last}
              </Text>
              <Text>
                Email: {item.email}
              </Text>
              <Text>
                City: {item.location.city}
              </Text>
              <Text>Phone: {item.phone}</Text>
            </View>
          </CardItem>
        </Card>
      )}
      />
      
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
  profilePic:{
    flex:2,
    height:100,
    width:100,
    marginEnd:10
  },
  userInfo:{
   flex:5,
   flexDirection:"column",
   marginStart:30
  },
  progress:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  }

});
