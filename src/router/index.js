import Vue from 'vue'
import Router from 'vue-router'
import UserList from '../pages/user/UserList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/base/user',
      component: UserList
    }
  ]
})
