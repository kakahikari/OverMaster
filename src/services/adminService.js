import xhr from './xhr/'
import { ERROR_CODES } from './xhr/config'
import { createCookie } from './'

class AdminService {
  login = ({context, body}) => {
    return new Promise((resolve, reject) => {
      let data = new FormData()
      data.append('account', body.account)
      data.append('password', body.password)

      return xhr({
        needToken: false,
        method: 'post',
        url: 'om/login',
        apiCode: 101,
        data,
        context
      }).then((res) => {
        if (!res) throw new Error('v-no-token')

        createCookie('apiToken', res, 1)
        createCookie('username', body.account, 1)

        let out = { token: res }
        return resolve(out)
      })
      .catch((err) => {
        return reject(context.$root.i18n(ERROR_CODES[err.toString()] || err))
      })
    })
  }

  getUser = ({context, body}) => {
    return new Promise((resolve, reject) => {
      let data = new FormData()
      data.append('sch_id', body.id)
      data.append('sch_name', body.name)
      data.append('sch_site', body.site)

      return xhr({
        method: 'post',
        url: 'om/getUser',
        apiCode: 102,
        context
      }).then((res) => {
        return resolve(res)
      }).catch((err) => {
        return reject(context.$root.i18n(ERROR_CODES[err.toString()] || err))
      })
    })
  }

  getMenuList = ({context}) => {
    return new Promise((resolve, reject) => {
      return xhr({
        method: 'post',
        url: 'om/getMenu',
        apiCode: 111,
        context
      }).then((res) => {
        return resolve(res)
      }).catch((err) => {
        return reject(context.$root.i18n(ERROR_CODES[err.toString()] || err))
      })
    })
  }

  getAuthority = ({context, body}) => {
    return new Promise((resolve, reject) => {
      let data = new FormData()
      if (body !== undefined) data.append('auth_id', body.auth_id)
      return xhr({
        method: 'post',
        url: 'om/getAuthority',
        apiCode: 106,
        data,
        context
      }).then((res) => {
        return resolve(res)
      }).catch((err) => {
        return reject(context.$root.i18n(ERROR_CODES[err.toString()] || err))
      })
    })
  }

  getAuthDetailList = ({context}) => {
    return new Promise((resolve, reject) => {
      return xhr({
        method: 'post',
        url: 'om/getAuthDetail',
        apiCode: 107,
        context
      }).then((res) => {
        return resolve(res)
      }).catch((err) => {
        return reject(context.$root.i18n(ERROR_CODES[err.toString()] || err))
      })
    })
  }
}

export default new AdminService()
