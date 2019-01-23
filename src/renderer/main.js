import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
// import VTree from 'vue-tree-halower'
import iView from 'iview'
import './assets/css/reset.css'
import 'vue-tree-halower/dist/halower-tree.min.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'iview/dist/styles/iview.css'
import '@/assets/css/element-ui.css'
import '@/assets/css/iview.css'
import '@/svg/evts/WinEvts'
/* eslint-disable */
import $ from 'jquery'
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(iView)
// Vue.use(VTree)
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
  mounted () {
    this.$store.dispatch('initList')
  }
}).$mount('#app')
