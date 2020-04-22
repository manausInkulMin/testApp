import { observable, action, computed } from 'mobx'

class UserSceneStore {
  @observable userPost = []

  @action
  updateUserPost(post) {
    this.userPost = post
  }

  @computed
  get onlyStory() {
    return this.userPost.filter(e => e.type === 'story')
  }

  @computed
  get onlyCourse() {
    return this.userPost.filter(e => e.type === 'course')
  }
}

export default UserSceneStore
