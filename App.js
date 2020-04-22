// import { AsyncStorage } from 'react-native';
import React, { useState, useEffect, useContext } from 'react'

import { SafeAreaProvider } from 'react-native-safe-area-context'
import { create } from 'mobx-persist'
import { Provider } from 'mobx-react'
import RootComponent from './root';
import { getUserProfile } from './actions/loginActions'
import { AsyncStorage } from 'react-native'
import stores from './stores'
// import AuthStore from './stores/auth';
// const hydrate = create({ storage: stores.auth })
// const authStore = new AuthStore

const App = () => {
  // useEffect(() => {
  //   Promise.all([
  //     getUserProfile({ username: 'MockData', password: '1234' }),
  //     // hydrate('auth', stores.auth)
  //   ]).then((response) => {
  //       if (response[0].data.success) {
  //           console.log("Token : " + response[0].data.token)
  //           stores.auth.updateToken(response[0].data.token)
  //           // authStore.updateToken(response[0].data.token)
  //       } else {
  //         alert("Warning Message : " + response[0].data.errorMsg)
  //       }
  //     })
  // }, [])

  return (
    <SafeAreaProvider>
      <Provider {...stores}>
        <RootComponent />
      </Provider>
  </SafeAreaProvider>
  )
}


export default App