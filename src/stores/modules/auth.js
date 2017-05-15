import { createCookie, readCookie } from 'services/'
import UserService from 'services/userService'
import UiService from 'services/uiService'
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
  login (store, param) {
    return new Promise((resolve, reject) => {
      const { context, body } = param
      UserService.login({ context, body }).then((res) => {
        MAIN.dispatch('setUser', param)
        MAIN.dispatch('setAuthToken', res.token)
        MAIN.commit('SET_AUTH_STATUS', 1)

        return resolve(res)
      })
      .catch((err) => {
        return reject(err)
      })
    })
  },
  logout (store, param) {
    MAIN.dispatch('ERASE_COOKIES')
  },
  async getSideMenu (store, param) {
    const language = await readCookie('language')

    return new Promise((resolve, reject) => {
      const params = { context: param, language: language }
      UiService.getFieldList(params).then((res) => {
        MAIN.dispatch('setSideMenu', res)
      })
      .catch((err) => {
        return reject(err)
      })
    })
  },
  async checkStatus (store, param) {
    const apiToken = await readCookie('apiToken')
    const username = await readCookie('username')
    const language = await readCookie('language')

    if (apiToken) {
      MAIN.commit('SET_AUTH_TOKEN', apiToken)
      MAIN.commit('SET_AUTH_STATUS', 1)
    }

    if (username) MAIN.commit('SET_AUTH_USERNAME', username)
    if (language) MAIN.commit('SET_AUTH_LANGUAGE', language)
  },
  async setUser (store, param) {
    const apiToken = await readCookie('apiToken')
    const apiNotAllowed = await Boolean(apiToken == null)
    const { body } = param

    console.log(`@{setUser}`, apiToken)

    if (apiNotAllowed) throw Error('v-no-token')
    MAIN.dispatch('setAuthUsername', body.username)
  },
  setAuthToken (store, param) {
    store.commit('SET_AUTH_TOKEN', param)
  },
  setAuthUsername (store, param) {
    store.commit('SET_AUTH_USERNAME', param)
  },
  async setLanguage (store, param) {
    const apiToken = await readCookie('apiToken')

    const { language } = param
    createCookie('language', language, 100)
    store.commit('SET_AUTH_LANGUAGE', language)
    if (apiToken) {
      MAIN.dispatch('getSideMenu', param)
    }
  },
  setSideMenu (store, param) {
    store.commit('SET_AUTH_SIDEMENU', param)
  }
}

export default {
  state,
  mutations,
  actions
}
