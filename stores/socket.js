import { observable, action } from 'mobx'

class SocketStore {
  @observable io = null

  @action setupSocketIO (io) {
    this.io = io
  }
}

export default SocketStore
