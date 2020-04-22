import { observable, action } from 'mobx'

class MessageStore {
  @observable title = null
  @observable subTitle = null
  @observable isVisible = false

  @action showAlertErrorMessage (isVisible, title, subTitle) {
    // if (!this.isVisible) {
    this.isVisible = isVisible
    if (title) {
      this.title = title
    }
    if (subTitle) {
      this.subTitle = subTitle
    }
    // }
  }
}

export default MessageStore
