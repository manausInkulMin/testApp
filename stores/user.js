import { observable, action } from 'mobx'
import { persist } from 'mobx-persist'

class UserStore {
  @observable info = {}
  @observable follow = {}

  @action updateUserInfo (info) {
    this.info = info
  }

  @action clearUserInfo () {
    this.info = {}
    this.follow = {}
  }

  @action updateFollow (follow) {
    this.follow = follow
  }
}

export default UserStore
