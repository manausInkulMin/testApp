import { observable, action } from 'mobx'

class LoadingStore {
  @observable disable = false
  @observable isLoading = false

  @action disableLoading () {
    this.disable = true
  }

  @action startLoading () {
    this.isLoading = true
  }

  @action stopLoading () {
    this.disable = false
    this.isLoading = false
  }
}

export default LoadingStore
