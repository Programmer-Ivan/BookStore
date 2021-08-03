import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {Swipe, SwipeItem} from './components/common/vant/Vant'

Vue.config.productionTip = false

//添加事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
