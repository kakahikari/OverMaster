import xhr from './xhr/'
import { ERROR_CODES } from './xhr/config'
import { createCookie, eraseCookie } from './'

class UserService {
  login = ({context, body}) => {
    return new Promise((resolve, reject) => {
      let data = new FormData()
      data.append('user', body.username)
      data.append('password', body.password)

      return xhr({
        needToken: false,
        method: 'post',
        url: 'agent/login',
        data,
        context
      }).then((res) => {
        if (!res.token) throw new Error('v-no-token')

        createCookie('apiToken', res.token, 1)
        createCookie('username', body.username, 1)

        let out = {}
        out.id = res.id
        out.status = Number(res.status)
        out.token = res.token
        return resolve(out)
      })
      .catch((err) => {
        return reject(context.$root.i18n(ERROR_CODES[err.toString()] || err))
      })
    })
  }

  logout = ({context}) => {
    return new Promise((resolve, reject) => {
      let data = null

      const removeToken = () => {
        eraseCookie('apiToken')
      }

      return xhr({
        needToken: false,
        method: 'post',
        url: 'agent/logout',
        data,
        context
      }).then((res) => {
        removeToken()
        return resolve(res)
      }).catch((err) => {
        removeToken()
        return reject(context.$root.i18n(ERROR_CODES[err.toString()] || err))
      })
    })
  }
}

export default new UserService()
