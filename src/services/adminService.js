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

        createCookie('apiToken', res.token, 1)
        createCookie('auth', res.auth_id, 1)
        createCookie('account', body.account, 1)

        return resolve(res)
      })
      .catch((err) => {
        return reject(context.$root.i18n(ERROR_CODES[err.toString()] || err))
      })
    })
  }

  getUserData = ({context, body}) => {
    return new Promise((resolve, reject) => {
      let data = new FormData()
      data.append('sch_account', body.sch_account)
      data.append('sch_name', body.sch_name)
      data.append('sch_site', body.sch_site)

      return xhr({
        method: 'post',
        url: 'om/getUserData',
        apiCode: 112,
        data,
        context
      }).then((res) => {
        if (res.length < 1) throw 'v-no-result'
        return resolve(res)
      }).catch((err) => {
        return reject(context.$root.i18n(ERROR_CODES[err.toString()] || err))
      })
    })
  }

  getUserList = ({context, body}) => {
    return new Promise((resolve, reject) => {
      let data = new FormData()
      data.append('sch_account', body.sch_account)
      data.append('sch_name', body.sch_name)
      data.append('sch_site', body.sch_site)

      return xhr({
        method: 'post',
        url: 'om/getUserList',
        apiCode: 102,
        data,
        context
      }).then((res) => {
        if (res.length < 1) throw 'v-no-result'
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
        if (res.length < 1) throw 'v-no-result'
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

  addUser = ({context, body}) => {
    return new Promise((resolve, reject) => {
      let data = new FormData()
      data.append('account', body.account)
      data.append('name', body.name)
      data.append('password', body.password)
      data.append('status', 1)
      data.append('authority', body.authority)
      data.append('site', body.site)

      return xhr({
        method: 'post',
        url: 'om/addUser',
        apiCode: 103,
        data,
        context
      }).then((res) => {
        return resolve(res)
      }).catch((err) => {
        return reject(context.$root.i18n(ERROR_CODES[err.toString()] || err))
      })
    })
  }

  editUser = ({context, body}) => {
    return new Promise((resolve, reject) => {
      let data = new FormData()
      data.append('user_id', body.user_id)
      data.append('name', body.name)
      data.append('password', body.password)
      data.append('status', body.status)
      data.append('authority', body.authority)
      data.append('site', body.site)

      return xhr({
        method: 'post',
        url: 'om/editUser',
        apiCode: 104,
        data,
        context
      }).then((res) => {
        return resolve(res)
      }).catch((err) => {
        return reject(context.$root.i18n(ERROR_CODES[err.toString()] || err))
      })
    })
  }

  editUserPassword = ({context, body}) => {
    return new Promise((resolve, reject) => {
      let data = new FormData()
      data.append('password', body.password)

      return xhr({
        method: 'post',
        url: 'om/editUserPassword',
        apiCode: 114,
        data,
        context
      }).then((res) => {
        return resolve(res)
      }).catch((err) => {
        return reject(context.$root.i18n(ERROR_CODES[err.toString()] || err))
      })
    })
  }

  addAuthority = ({context, body}) => {
    return new Promise((resolve, reject) => {
      let data = new FormData()
      data.append('name', body.name)
      data.append('code', body.code)

      return xhr({
        method: 'post',
        url: 'om/addAuthority',
        apiCode: 108,
        data,
        context
      }).then((res) => {
        return resolve(res)
      }).catch((err) => {
        return reject(context.$root.i18n(ERROR_CODES[err.toString()] || err))
      })
    })
  }

  editAuthority = ({context, body}) => {
    return new Promise((resolve, reject) => {
      let data = new FormData()
      data.append('auth_id', body.auth_id)
      data.append('name', body.name)
      data.append('code', body.code)

      return xhr({
        method: 'post',
        url: 'om/editAuthority',
        apiCode: 109,
        data,
        context
      }).then((res) => {
        return resolve(res)
      }).catch((err) => {
        return reject(context.$root.i18n(ERROR_CODES[err.toString()] || err))
      })
    })
  }

  delAuthority = ({context, body}) => {
    return new Promise((resolve, reject) => {
      let data = new FormData()
      data.append('auth_id', body.auth_id)

      return xhr({
        method: 'post',
        url: 'om/delAuthority',
        apiCode: 110,
        data,
        context
      }).then((res) => {
        return resolve(res)
      }).catch((err) => {
        return reject(context.$root.i18n(ERROR_CODES[err.toString()] || err))
      })
    })
  }

  editUserWater = ({context, body}) => {
    return new Promise((resolve, reject) => {
      let data = new FormData()
      data.append('user_id', body.user_id)
      data.append('site', body.site)
      data.append('water_type', body.water_type || 'q')
      data.append('value_min', body.value_min || '0')
      data.append('value_max', body.value_max)

      return xhr({
        method: 'post',
        url: 'om/editUserWater',
        apiCode: 105,
        data,
        context
      }).then((res) => {
        return resolve(res)
      }).catch((err) => {
        return reject(context.$root.i18n(ERROR_CODES[err.toString()] || err))
      })
    })
  }

  getUserWater = ({context, body}) => {
    return new Promise((resolve, reject) => {
      let data = new FormData()
      data.append('user_id', body.user_id)

      return xhr({
        method: 'post',
        url: 'om/getUserWater',
        apiCode: 115,
        data,
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
