import Vue from 'vue'
import Router from 'vue-router'
import UserList from '../pages/user/UserList'
import RoleList from '../pages/role/RoleList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/base/user',
      component: UserList
    },{
      path: '/base/role',
      component: RoleList
    }
  ]
})
