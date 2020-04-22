import React from 'react'
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native'
import AuthStore from '../stores/auth';
import { observer, inject } from 'mobx-react'

class Home extends React.Component {

  static navigationOptions = {
    title: 'Home',
    headerLeft: null
  };
  
  render() {
    // const {
    //   accessToken
    // } = this.props
    console.log('accessToken : ' + AuthStore.accessToken)
    return (
      <View>
        <View>
          <TouchableOpacity 
            style={styles.buttonStyle} 
            activeOpacity={0.5}
            onPress={ () => this.props.navigation.navigate( 'Procurement' )}
          >
            <Image source={require('../images/icon/Purchase3.png')} style={styles.ImageIconStyle} />
            {/* <View style={styles.SeparatorLine} /> */}
            <Text style={styles.TextStyle}> Procurement </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity 
            style={styles.buttonStyle} 
            activeOpacity={0.5}
            onPress={ () => this.props.navigation.navigate( 'Profile' )}
          >
            <Image source={require('../images/icon/Prodution4.png')} style={styles.ImageIconStyle} />
            {/* <View style={styles.SeparatorLine} /> */}
            <Text style={styles.TextStyle}> Manufacturing </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    padding: 0
    // backgroundColor: '#F5FCFF',
    // marginBottom: "10%"
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  buttonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dc4e41',
    borderWidth: 0.5,
    borderColor: '#fff',
    // height: '40%',
    // width: '97%',
    borderRadius: 5,
    // margin: 5,
  },
  FacebookStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#485a96',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 40,
    width: 220,
    borderRadius: 5,
    margin: 5,
  },
  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  },
  TextStyle: {
    color: '#fff',
    marginBottom: 4,
    marginRight: 20,
  },
  SeparatorLine: {
    backgroundColor: '#fff',
    width: 1,
    height: 40,
  },
});

export default inject('auth')(Home)