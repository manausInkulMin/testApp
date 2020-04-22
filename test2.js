/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect, useContext } from 'react'
import {
  AsyncStorage
} from 'react-native'

import SplashScreen from 'react-native-splash-screen'

import { create } from 'mobx-persist'
import { Provider } from 'mobx-react'

import Root from '~/src/scene/Root'

import stores from '~/src/stores'
import { dispatch } from '~/src/common/navigate'
import { api } from '~/src/api'
import { Apis, ResponseCodes } from '~/src/common/apis'
import { SafeAreaProvider } from 'react-native-safe-area-context'

console.disableYellowBox = true // disable warning box

// Create Hydrate for persist state
const hydrate = create({
  storage: AsyncStorage,
  jsonify: true
})


const App = () => {
  // const [ showRoute, setShowRoute ] = useState(false)

  useEffect(() => {
    Promise.all([
      // hydrate('record', stores.record),
      hydrate('auth', stores.auth)
      // hydrate('device', stores.device),
      // hydrate('contact', stores.contact),
      // hydrate('event', stores.event)
    ])
      .then((result) => {
        // SplashScreen.hide()
        if (result[0].accessToken) {
          api.get(Apis.paths.my_profile).then(result => {
            if (ResponseCodes.isSuccess(result.data.resCode)) {
              stores.user.updateUserInfo(result.data.user)
              stores.user.updateFollow(result.data.follow)
              dispatch('Main')
              // dispatch('Coins')
              setTimeout(() => {
                SplashScreen.hide()
              }, 2000)
            } else {
              SplashScreen.hide()
            }
          }).catch(err => {
            console.error(err)
            SplashScreen.hide()
          })
        } else {
          SplashScreen.hide()
        }
      })
      .catch((error) => {
        // setShowRoute(true)
        console.log(error)
        SplashScreen.hide()
      })
  }, [])
  return (
    <SafeAreaProvider>
        <Provider {...stores}>
          <Root />
        </Provider>
    </SafeAreaProvider>
  )
}

export default App
