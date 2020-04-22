import { CALL_API } from 'redux-api-middleware'
const axios = require('axios').default;
import moment from 'moment'
import { 
    LOGIN_USER
} from '../constants/endpoints'

import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

export const getUserProfile = (data) => (
  axios({
    method: 'post',
    url: LOGIN_USER,
    data: {
        username: data.username,
        password: data.password
    }
  }).then((response) => {
    // console.log('response : ' + response)
    return response
  }).catch(function (error) {
    console.log(error);
  })
)
