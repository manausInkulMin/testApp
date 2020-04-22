import { createAppContainer } from 'react-navigation';
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
import { createStackNavigator } from 'react-navigation-stack';


import HomeScreen from './components/Home';
import ProfileScreen from './components/Profile';
import Procurement from './components/Procurement';
import PurchaseRequisitionApproval from './components/Procurement/PurchaseRequisitionApproval';
import PurchaseRequisitionApprovalDetail from './components/Procurement/PurchaseRequisitionApprovalDetail';
import FilterPage from './components/FilterScreens/FilterScreen';
import LoginScreen from './components/Login/loginScreen';

const AppNavigator = createStackNavigator({
  LoginScreen: {screen: LoginScreen},
  Home: {screen: HomeScreen},
  Profile: {screen: ProfileScreen},
  Procurement: {screen: Procurement},
  PurchaseRequisitionApproval: {screen: PurchaseRequisitionApproval},
  PurchaseRequisitionApprovalDetail: {screen: PurchaseRequisitionApprovalDetail},
  FilterPage: {screen: FilterPage}
});

const root = createAppContainer(AppNavigator);

export default root