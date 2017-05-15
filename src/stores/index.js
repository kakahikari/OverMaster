import { eraseCookie } from 'services'

import Vue from 'vue'
import Vuex from 'vuex'
import AUTH from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    AUTH
  },
  actions: {
    ERASE_COOKIES ({commit}) {
      eraseCookie('apiToken')
      eraseCookie('username')

      commit('AUTH_DEFAULT')
    },
    SET_DEFAULT ({commit}) {
      commit('AUTH_DEFAULT')
    }
  }
})
