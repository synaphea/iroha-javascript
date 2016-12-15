// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'
import App from './App'
import CreateUser from './components/CreateUser'
import User from './components/User'
import Wallet from './components/Wallet'
import Send from './components/Send'
import Receive from './components/Receive'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', component: CreateUser },
    {
      path: '/user',
      component: User,
      children: [
        { path: 'wallet', component: Wallet },
        { path: 'send', component: Send },
        { path: 'receive', component: Receive }
      ]
    }
  ]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  router: router,
  components: { App }
})
