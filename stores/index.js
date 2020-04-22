// import { create } from 'mobx-persist'
// import { createContext } from 'react'
// import { AsyncStorage } from 'react-native'
// // import NavigationStore from './navigation'
// import LoadingStore from './loading'

// const hydrate = create({
//   storage: AsyncStorage,
//   jsonify: true
// })
// export class RootStore {
//     // navigation = new NavigationStore(this)
//     loading = new LoadingStore(this)
//     // constructor () {
//     //   hydrate('navigation', this.navigation)
//     // }
// }

// export default createContext(new RootStore())

import LoadingStore from './loading'
import NavigationStore from './navigation'
import AuthStore from './auth'
import MessageStore from './message'
import UserStore from './user'
import ProfileSceneStore from './profileSceneStore'
import UserSceneStore from './userSceneStore'
import SocketStore from './socket'

export default {
  loading: new LoadingStore(),
  navigation: new NavigationStore(),
  auth: new AuthStore(),
  message: new MessageStore(),
  user: new UserStore(),
  profileSceneStore: new ProfileSceneStore(),
  userSceneStore: new UserSceneStore(),
  socket: new SocketStore()
}
