import React from 'react'
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { loadPurchaseRequisition, searchPurchaseRequisition } from '../actions/PurchaseActions'

const axios = require('axios').default;

export default class Procurement extends React.Component {

  static navigationOptions = {
    title: 'Procurement',
  };

  state = {
    rows: ''
  }

  componentWillMount() {
    searchPurchaseRequisition(
      { 
        value: 'A100',
        token: 'TestLN107'
      }
    ).then((response) => {
      if (response.data.success) {
        this.setState({
          rows: response.data.rows
        })
      } else {
        alert("Warning Message : " + errorMsg)
      }
    })
  }
  
  render() {
    const {
      rows
    } = this.state
    return (
      <View>
        <View>
          <TouchableOpacity 
            style={styles.buttonStyle} 
            activeOpacity={0.5}
            onPress={ () => this.props.navigation.navigate( 'PurchaseRequisitionApproval' )}
          >
            <Image source={require('../images/icon/PR4.png')} style={styles.ImageIconStyle} />
            <Text style={styles.TextStyle}> Purchase Requisition Approval </Text>
            <Text style={styles.TextStyle, { textAlign: "left", width: '100%', marginLeft: '22%', color: '#FFFFFF' }}>{rows}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity 
            style={styles.buttonStyle} 
            activeOpacity={0.5}
            onPress={ () => this.props.navigation.navigate( 'Profile' )}
          >
            <Image source={require('../images/icon/PO4.png')} style={styles.ImageIconStyle} />
            <Text style={styles.TextStyle}> Purchase Order Approval </Text>
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