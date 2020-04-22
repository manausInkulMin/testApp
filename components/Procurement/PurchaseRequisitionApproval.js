import React, { useState, useEffect } from "react";

import moment from 'moment'
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Button, 
  TextInput,
  TouchableWithoutFeedback,
  AsyncStorage
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-datepicker'
import Modal from 'react-native-modal';
import Constants from 'expo-constants';
import { loadPurchaseRequisition, searchPurchaseRequisition } from '../../actions/PurchaseActions'
import { convertstatusText, convertstatusColor } from '../../until'
import { GET_PUECHASE_REQUISITION } from '../../constants/endpoints'
import { observer, inject } from 'mobx-react'


function Item({ 
                selected, onSelect,
                orderNumber, site,
                status, dateRequisition,
                dateRequested, Requester,
                ref1, index
             }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(orderNumber)}
      style={[
        styles.item 
      ]}
    >
      <View style={{ flex: 1 }} key={ index }>
        <Text style={{ flex: 1, color: '#29C0FA' }}>{ orderNumber }</Text>
        <Text style={{ textAlign: 'right', marginTop: -17, color: convertstatusColor(status) }}>{ convertstatusText(status) }</Text>
      </View>
      <Text>Site : {site}</Text>
      <Text>Requisition Date: { moment(dateRequisition).format('DD MMMM YYYY H:mm:ss') }</Text>
      <Text>Requested Date: { moment(dateRequested).format('DD MMMM YYYY H:mm:ss') }</Text>
      <Text>Requester: { Requester }</Text>
      <Text>Ref.: { ref1 }</Text>
    </TouchableOpacity>
  );
}

// PurchaseRequisitionApproval['navigationOptions'] = screenProps => ({
//   title: 'Purchase Requisition Approval'
// })
// PurchaseRequisitionApproval['navigationOptions'] = 
//   function (screenProps) {
//     return {
//       title: 'Purchase Requisition Approval'
//     };
//   }

const PurchaseRequisitionApproval = observer((props) => {

  console.log("test : " + props.auth.accessToken)
  
  const [selected, setSelected] = React.useState(new Map());
  const [ isModalVisible, setIsModalVisible ] = React.useState(false)
  const [ site, setSite ] = React.useState()
  const [ status, setStatus ] = React.useState()
  const [ supplier, setSupplier ] = React.useState()
  const [ plannedReceiptFrom, setPlannedReceiptFrom ] = React.useState()
  const [ plannedReceiptTo, setPlannedReceiptTo ] = React.useState()
  const [ dataPR, setDataPR ] = React.useState(new Array())
  const [ statusColor, setStatusColor ] = React.useState()
  const [ statusText, setStatusText ] = React.useState()
  const [ accessToken, setAccessToken ] = React.useState()
  const onSelect = React.useCallback(
    orderNumber => {
      const newSelected = new Map(selected);
      newSelected.set(orderNumber, !selected.get(orderNumber));
      onPress(orderNumber)
      setSelected(newSelected);
    },
    [selected],
  );

  const onPress = (orderNumber) => {
    const { navigation } = props
    navigation.navigate('PurchaseRequisitionApprovalDetail', { orderNo: orderNumber })
  };

  const onPressFilter = () => {
    setIsModalVisible(!isModalVisible) 
  };

  const onPressFilterDate = (event) => {
    event.preventDefault();
    console.log("Site : " + site)
    console.log("Status : " + status)
    console.log("Supplier : " + supplier)
    console.log("PlannedReceiptFrom : " + plannedReceiptFrom)
    console.log("PlannedReceiptto : " + plannedReceiptTo)
  };

  const onPressClearFilter = () => {
    setSite(null)
    setStatus(null)
    setSupplier()
    setPlannedReceiptFrom()
    setPlannedReceiptTo()
  };
  useEffect(() => {
    searchPurchaseRequisition(
        { 
          value: 'A100',
          token: 'TestLN107'
        }
    ).then((response) => {
      if (response.data.success) {
        setDataPR(response.data.data)
        // setStoresToken(response.data.token)
        // getStoresToken()
      } else {
        alert("Warning Message : " + errorMsg)
      }
    })
  }, [])

  // const setStoresToken = async (token) => {
  //   try {
  //     await AsyncStorage.setItem('token', token)
  //     console.log('Add Stores Access Token Success !')
  //   } catch (error) {
  //     alert('Error')
  //   }
  // };

  // const getStoresToken = async () => {
  //   try {
  //     const values = await AsyncStorage.getItem('token')
  //     if (values != '') {
  //       // alert('Access Token : ' + values)
  //       setAccessToken(values)
  //     } else {
  //       alert(' Else condition')
  //     }
  //   } catch (error) {
  //     alert('Error')
  //   }
  // };

  return (
    <View style={styles.container}>
        <View style={styles.SectionStyle}>
            <Image
                source={require('../../images/icon/search-box-icon.png')}
                style={styles.ImageStyle}
            />
            <TextInput
                style={{ flex: 1 }}
                placeholder="Search"
                onChangeText={text => setSupplier(text)}
                value={ supplier }
                // underlineColorAndroid="transparent"
            />
        </View>
        <View>
          <TouchableOpacity 
            style={styles.buttonStyle} 
            activeOpacity={0.5}
            onPress={ onPressFilter }
          >
            {/* <Text>test</Text> */}
            <Image source={require('../../images/icon/filter.png')} style={styles.FilterButtonStyle} />
          </TouchableOpacity>
          {/* <Button title="Hide modal" onPress={onPressFilter} /> */}
        </View>
        <View >
          <Modal isVisible={ isModalVisible } style={{ backgroundColor: '#ffffff', flex: 1, height: '20%', marginTop: '15%' }}>
            <View style={{ flex: 1, marginTop: 30 }}>
              <Text style={ styles.TextStyle }>Filter Purchase Order</Text>
             
                <View style={{ flex: 1 }}>
                  <View style={{  flexDirection: 'row', }}>
                    <Text style={ styles.TextStyle }>Site: </Text>
                    <View style={ styles.SelectStyle }>
                      <RNPickerSelect
                          style={ pickerSelectStyles.inputIOS }
                          onValueChange={(value) => setSite(value)}
                          items={[
                              { label: 'TYK', value: 'TYK' },
                              { label: 'FMS', value: 'FMS' },
                              { label: 'FMF', value: 'FMF' },
                              { label: 'TSA', value: 'TSA' },
                          ]}
                          value={ site }
                      />
                    </View>
                  </View>
                  <View style={{  flexDirection: 'row', }}>
                    <Text style={ styles.TextStyle }>Status: </Text>
                    <View style={ styles.SelectStyle }>
                      <RNPickerSelect
                          style={ pickerSelectStyles.inputIOS }
                          onValueChange={(value) => setStatus(value)}
                          items={[
                              { label: 'Created', value: 'Created' },
                              { label: 'Approved', value: 'Approved' },
                              { label: 'Modified', value: 'Modified' },
                              { label: 'Sent', value: 'Sent' },
                              { label: 'In Process', value: 'In Process' },
                              { label: 'Blocked', value: 'Blocked' },
                              { label: 'Canceled', value: 'Canceled' },
                              { label: 'Closed', value: 'Closed' },
                          ]}
                          value={ status }
                      />
                    </View>
                  </View>
                  <View style={{  flexDirection: 'row', }}>
                    <Text style={ styles.TextStyle }>Supplier: </Text>
                    <View style={styles.SectionStyle}>
                      <Image
                          source={require('../../images/icon/search-box-icon.png')}
                          style={styles.ImageStyle}
                      />
                      <TextInput
                          style={{ flex: 1 }}
                          placeholder="Search"
                          onChangeText={text => setSupplier(text)}
                          value={ supplier }
                      />
                    </View>
                  </View>
                  <View >
                    <Text style={ styles.TextStyle, {textAlign: "left", marginBottom: 10 } }>Planned Receipt: </Text>
                    <View >
                      <DatePicker
                          style={{ width: 200 }}
                          mode="date"
                          date={ plannedReceiptFrom }
                          placeholder="SELECT DATE"
                          format="DD-MM-YYYY"
                          // value={ plannedReceiptFrom }
                          confirmBtnText="Confirm"
                          cancelBtnText="Cancel"
                          customStyles={{
                            dateIcon: { position: 'absolute', left: 0, top: 4, marginLeft: 0},
                            dateInput: { marginLeft: 36, borderRadius: 5, }
                          }}
                          onDateChange={(dateFrom) => {setPlannedReceiptFrom(dateFrom)}}
                        />
                        <Text>-</Text>
                        <DatePicker
                          style={{ width: 200 }}
                          date={ plannedReceiptTo }
                          mode="date"
                          placeholder="SELECT DATE"
                          format="DD-MM-YYYY"
                          // value={ plannedReceiptTo }
                          // minDate="2016-05-01"
                          // maxDate="2016-06-01"
                          confirmBtnText="Confirm"
                          cancelBtnText="Cancel"
                          customStyles={{
                            dateIcon: { position: 'absolute', left: 0, top: 4, marginLeft: 0},
                            dateInput: { marginLeft: 36, borderRadius: 5, }
                          }}
                          onDateChange={(dateTo) => {setPlannedReceiptTo(dateTo)}}
                        />
                    </View>
                  </View>
                  <TouchableOpacity 
                    style={styles.buttonStyle} 
                    activeOpacity={0.5}
                    onPress={ onPressClearFilter }
                  >
                    <Text style={styles.ClearTextStyle}> Clear Filter </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity 
                    style={styles.buttonStyle} 
                    activeOpacity={0.5}
                    onPress={ onPressFilterDate }
                  >
                    <Text style={styles.ClearTextStyle}> OK </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.buttonStyle} 
                    activeOpacity={0.5}
                    onPress={ onPressFilter }
                  >
                    <Text style={styles.ClearTextStyle}> Closed </Text>
                </TouchableOpacity>
              
            </View>
          </Modal>
        </View>
        <SafeAreaView style={styles.table}>
            <FlatList
                data={dataPR}
                renderItem={({ item }) => (
                  <Item
                      orderNumber={item.t_rqno} 
                      site={item.t_cofc}
                      status={item.t_rqst}
                      dateRequisition={item.t_rdat}
                      dateRequested={item.t_ltdt}
                      Requester={item.t_remn}
                      ref1={ item.t_refa }
                      selected={!!selected.get(item.t_rqno)}
                      onSelect={onSelect}
                      index={item.t_rqno}
                  />
                )}
                keyExtractor={item => item.t_rqno}
                extraData={selected}
            />
        </SafeAreaView>
        
    </View>
  );
})

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // marginTop: Constants.statusBarHeight,
    },
    table: {
      flex: 1,
      // marginTop: Constants.statusBarHeight,
    },
    item: {
      backgroundColor: '#FFFFFF',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
    SectionStyle: {
      flexDirection: 'row',
      // justifyContent: 'center',
      // alignItems: 'center',
      backgroundColor: '#fff',
      borderWidth: 0.5,
      borderColor: '#000',
      height: 40,
      width: '80%',
      borderRadius: 5,
      margin: 10,
    },
    SelectStyle: {
      // flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderWidth: 0.5,
      borderColor: '#000',
      height: 40,
      width: '80%',
      borderRadius: 5,
      margin: 10,
    },
    ImageStyle: {
      padding: 10,
      margin: 5,
      height: 25,
      width: 25,
      resizeMode: 'stretch',
      alignItems: 'center',
    },
    FilterButtonStyle: {
      padding: 10,
      marginTop: '-10.3%',
      marginLeft: '93%',
      height: 25,
      width: 25,
    }, 
    TextStyle: {
      fontSize: 16,
      textAlign: "center",
      color: '#29C0FA',
      marginTop: '5%'
    },
    ClearTextStyle: {
      fontSize: 16,
      textAlign: "left",
      color: '#29C0FA',
      marginTop: '5%',
      textDecorationLine: "underline",

    },
  });
  
  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
    },
});

export default inject('auth')(PurchaseRequisitionApproval)