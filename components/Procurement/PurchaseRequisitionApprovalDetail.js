import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image, 
  TextInput,
  TouchableWithoutFeedback,
  Modal
} from 'react-native';
import Constants from 'expo-constants';

const DATA = [
    {
      orderNumber: 'HD2000001',
      site: 'Site: สำนักงานใหญ่',
      amount: '20,000.00 THB',
      status: 'Created',
      company: 'บจก.กู๊ดไทม์ อินเปอร์ต เอ็กซ์เปอร์ต',
      supplierOrder: 'Supplier Order: SQ7827096',
      plannedReceipt: 'Planned Receipt: 20/03/2020',
      ref: 'Ref: ด่วนมาก',
      image: 'https://reactnative.dev/img/tiny_logo.png'
    },
    {
      orderNumber: 'HD2000002',
      site: 'Site: สำนักงานใหญ่',
      amount: '50,000.00 THB',
      status: 'Modified',
      company: 'บจก.กู๊ดไทม์ อินเปอร์ต เอ็กซ์เปอร์ต',
      supplierOrder: 'Supplier Order: SQ7827096',
      plannedReceipt: 'Planned Receipt: 20/03/2020',
      ref: 'Ref: ด่วนมาก',
      image: 'https://reactnative.dev/img/tiny_logo.png'
    },
    {
      orderNumber: 'HD2000003',
      site: 'Site: สำนักงานใหญ่',
      amount: '100,000.00 THB',
      status: 'Created',
      company: 'บจก.กู๊ดไทม์ อินเปอร์ต เอ็กซ์เปอร์ต',
      supplierOrder: 'Supplier Order: SQ7827096',
      plannedReceipt: 'Planned Receipt: 20/03/2020',
      ref: 'Ref: ด่วนมาก',
      image: 'https://reactnative.dev/img/tiny_logo.png'
    },
  ];

function Item({ 
                selected, onSelect,
                orderNumber, site,
                amount, status,
                company, supplierOrder, 
                plannedReceipt, ref1, images
             }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(orderNumber)}
      style={[
        styles.item //, { backgroundColor: selected ? '#6e3b6e' : '#f9c2ff' },
      ]}
    >
      <View style={{ flex: 1, lexDirection: 'row' }}>
        <Text style={{ textAlign: 'left', color: '#29C0FA' }}>{orderNumber}</Text>
        <Text style={{ textAlign: 'center', marginTop: -17, color: '#FF3333' }}>{amount}</Text>
        <Text style={{ textAlign: 'right', marginTop: -17, color: status === 'Modified' ? '#C44CFB' : '#29C0FA' }}>{status}</Text>
      </View>
      <Text>{site}</Text>
      <Text style={{ flex: 1, color: '#29C0FA' }}>{company}</Text>
      <Text style={{ flex: 1, color: '#ADADAD' }}>{supplierOrder}</Text>
      <Text style={{ flex: 1, color: '#ADADAD' }}>{plannedReceipt}</Text>
      <Text style={{ flex: 1, color: '#ADADAD' }}>{ref1}</Text>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <Image style={[ styles.ImageStyleInTable, { resizeMode: 'stretch' }]} source={{ uri: images }} />
      </View>
    </TouchableOpacity>
  );
}

PurchaseRequisitionApprovalDetail['navigationOptions'] = screenProps => ({
  title: screenProps.navigation.getParam( 'orderNo' )
})

export default function PurchaseRequisitionApprovalDetail (props) {
  const [selected, setSelected] = React.useState(new Map());
  
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
    navigation.navigate('Profile', { orderNo: orderNumber })
  };

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
                // underlineColorAndroid="transparent"
            />
        </View>
        <SafeAreaView style={styles.table}>
            <FlatList
                data={DATA}
                renderItem={({ item }) => (
                  <Item
                      orderNumber={item.orderNumber} 
                      site={item.site}
                      amount={item.amount}
                      status={item.status}
                      company={item.company}
                      supplierOrder={item.supplierOrder} 
                      plannedReceipt={item.plannedReceipt}
                      ref1={item.ref}
                      images={item.image}
                      selected={!!selected.get(item.orderNumber)}
                      onSelect={onSelect}
                  />
                )}
                keyExtractor={item => item.id}
                extraData={selected}
            />
        </SafeAreaView>
    </View>
  );
}

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
    ImageStyleInTable: {
      // padding: '10%',
      // margin: '10%',
      marginLeft: '80%',
      marginTop: '-20%',
      height: 70,
      width: 70,
      resizeMode: 'stretch'
    },     
  });
  