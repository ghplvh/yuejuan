import Vue from 'vue'
import Vuex from 'vuex'
import {
  Base64
} from 'js-base64'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    adminInfo: {},
    isLogin: false
  },
  mutations: {
    saveAdminInfo (state) {
      if (!sessionStorage.getItem('adminInfo')) {
        return
      }
      let adminInfo = JSON.parse(Base64.decode(sessionStorage.getItem('adminInfo')))
      state.menuList = []
      adminInfo.dmlist.forEach(element => {
        state.menuList.push(element.menuUrl)
      })
      state.adminInfo = adminInfo
      state.isLogin = !!adminInfo && !!adminInfo.id
    },
    removeAdminInfo (state) {
      state.adminInfo = {}
      state.isLogin = false
      sessionStorage.removeItem('adminInfo')
    }
  },
  actions: {
    saveAdminInfo ({
      commit
    }) {
      commit('saveAdminInfo')
    },
    removeAdminInfo ({
      commit
    }) {
      commit('removeAdminInfo')
    }
  }
})
