import { createCookie, readCookie } from 'services/'
import AdminService from 'services/adminService'
import SiteService from 'services/siteService'

const state = {
  token: '',
  auth: '',
  status: 0,
  account: '',
  language: '',
  currency: '',
  sideMenu: [],
  siteList: [],
  authorityList: []
}

const mutations = {
  AUTH_DEFAULT (state) {
    state.token = ''
    state.auth = ''
    state.status = 0
    state.account = ''
    state.sideMenu = []
    state.siteList = []
    state.authorityList = []
  },
  SET_AUTH_TOKEN (state, payload) {
    state.token = payload
  },
  SET_AUTH_AUTH (state, payload) {
    state.auth = payload
  },
  SET_AUTH_STATUS (state, payload) {
    state.status = payload
  },
  SET_AUTH_ACCOUNT (state, payload) {
    state.account = payload
  },
  SET_AUTH_LANGUAGE (state, payload) {
    state.language = payload
  },
  SET_AUTH_SIDEMENU (state, payload) {
    state.sideMenu = payload
  },
  SET_AUTH_siteList (state, payload) {
    state.siteList = payload
  },
  SET_AUTH_AUTHORITYLIST (state, payload) {
    state.authorityList = payload
  }
}

const actions = {
  login (store, param) {
    return new Promise((resolve, reject) => {
      const { context, body } = param
      AdminService.login({ context, body }).then((res) => {
        store.dispatch('setUser', param)
        store.dispatch('setAuthToken', res)
        store.commit('SET_AUTH_STATUS', 1)

        return resolve(res)
      })
      .catch((err) => {
        return reject(err)
      })
    })
  },
  logout (store, param) {
    store.dispatch('ERASE_COOKIES')
  },
  async getSideMenu (store, param) {
    const language = await readCookie('language')

    return new Promise((resolve, reject) => {
      const params = { context: param, language: language }
      AdminService.getMenuList(params).then((res) => {
        store.commit('SET_AUTH_SIDEMENU', res)
        return resolve()
      })
      .catch((err) => {
        return reject(err)
      })
    })
  },
  getSiteList (store, param) {
    return new Promise((resolve, reject) => {
      const params = { context: param.context }
      SiteService.getSiteList(params).then((res) => {
        store.commit('SET_AUTH_siteList', res)
        return resolve()
      })
      .catch((err) => {
        return reject(err)
      })
    })
  },
  getAuthDetailList (store, param) {
    return new Promise((resolve, reject) => {
      const params = { context: param.context }
      AdminService.getAuthDetailList(params).then((res) => {
        store.commit('SET_AUTH_AUTHORITYLIST', res)
        return resolve()
      })
      .catch((err) => {
        return reject(err)
      })
    })
  },
  async checkStatus (store, param) {
    const apiToken = await readCookie('apiToken')
    const auth = await readCookie('auth')
    const account = await readCookie('account')
    const language = await readCookie('language')

    if (apiToken) {
      store.commit('SET_AUTH_TOKEN', apiToken)
      store.commit('SET_AUTH_STATUS', 1)
      store.dispatch('getSiteList', {context: param.context})
      store.dispatch('getAuthDetailList', {context: param.context})
    }

    if (auth) store.commit('SET_AUTH_AUTH', auth)
    if (account) store.commit('SET_AUTH_ACCOUNT', account)
    if (language) store.commit('SET_AUTH_LANGUAGE', language)
  },
  async setUser (store, param) {
    const apiToken = await readCookie('apiToken')
    const apiNotAllowed = await Boolean(apiToken == null)
    const { body } = param

    console.log(`@{setUser}`, apiToken)

    if (apiNotAllowed) throw Error('v-no-token')
    store.dispatch('setAuthAccount', body.account)
  },
  setAuthToken (store, param) {
    store.commit('SET_AUTH_TOKEN', param.token)
    store.commit('SET_AUTH_AUTH', param.auth_id)
  },
  setAuthAccount (store, param) {
    store.commit('SET_AUTH_ACCOUNT', param)
  },
  async setLanguage (store, param) {
    const { language } = param
    createCookie('language', language, 100)
    store.commit('SET_AUTH_LANGUAGE', language)
  }
}

export default {
  state,
  mutations,
  actions
}
