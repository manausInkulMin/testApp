import { observable, action } from 'mobx'
import { persist } from 'mobx-persist'

class AuthStore {
  @persist @observable accessToken = null
  // @persist  @observable accessToken = null
  // @persist @observable accessToken = 'trsdttetet'
  // @persist @observable refreshToken = null
  // @persist @observable storeHydrated = false;

  @action updateToken (accessToken) {
    this.accessToken = accessToken
    console.log('Paramiter accessToken : ' + this.accessToken)
  }
}

export default AuthStore
