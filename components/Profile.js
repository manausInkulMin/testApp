import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class Profile extends React.Component {

  static navigationOptions = {
    title: 'Profile',
  };

  render() {
    return (
      
      <Text> Profile Screen </Text>
      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
});