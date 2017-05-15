import { createCookie, readCookie } from 'services/'
import MAIN from '../'

const state = {
  token: '',
  status: 0,
  username: '',
  language: '',
  currency: '',
  sideMenu: []
}

const mutations = {
  AUTH_DEFAULT (state) {
    state.token = ''
    state.status = 0
    state.username = ''
    state.sideMenu = []
  },
  SET_AUTH_TOKEN (state, payload) {
    state.token = payload
  },
  SET_AUTH_STATUS (state, payload) {
    state.status = payload
  },
  SET_AUTH_USERNAME (state, payload) {
    state.username = payload
  },
  SET_AUTH_LANGUAGE (state, payload) {
    state.language = payload
  },
  SET_AUTH_SIDEMENU (state, payload) {
    state.sideMenu = payload
  }
}

const actions = {

}

export default {
  state,
  mutations,
  actions
}
