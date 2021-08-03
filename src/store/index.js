import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import {getCart} from '@/network/cart'
export default new Vuex.Store({
  state: {
    user: {
      isLogin:window.localStorage.getItem('token') ? true : false
    },

    count: 0
  },
  mutations: {
    setIsLogin(state, payload) {
      state.user.isLogin = payload;
    },

    addCount(state , payload){
      state.count = payload.count
    }
  },
  actions: {
    updata(content){
      getCart().then(res => {
        content.commit('addCount' , {count: res.data.length || 0})
        // console.log(res.data.length)
      })

    }
  },
  modules: {
  }
})
