import { CALL_API } from 'redux-api-middleware'
const axios = require('axios').default;
import moment from 'moment'
import { 
  GET_PUECHASE_REQUISITION,
  SEARCH_PUECHASE_REQUISITION
} from '../constants/endpoints'

import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

export const loadPurchaseRequisition = (data) => (
  axios({
    method: 'GET',
    url: GET_PUECHASE_REQUISITION,
    params: {
      value: data.value,
      token: data.token
    }
  }).then((response) => {
    console.log('Token : ' + response.token)
    return response
  }).catch(function (error) {
    console.log(error);
  })
)

export const searchPurchaseRequisition = (data) => (
  axios({
    method: 'GET',
    url: SEARCH_PUECHASE_REQUISITION,
    params: {
      value: data.value,
      token: data.token
    }
  }).then((response) => {
    return response
  }).catch(function (error) {
    console.log(error);
  })
)