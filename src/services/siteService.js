import xhr from './xhr/'
import { ERROR_CODES } from './xhr/config'

class SiteService {
  getSiteList = ({context, body}) => {
    return new Promise((resolve, reject) => {
      let data = new FormData()
      if (body !== undefined) data.append('site_code', body.site_code)

      return xhr({
        method: 'post',
        url: 'om/getSiteList',
        apiCode: 301,
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

  getStatistics = ({context, body}) => {
    return new Promise((resolve, reject) => {
      let data = new FormData()
      data.append('site_code', body.site_code)
      data.append('start_time', body.start_time)
      data.append('end_time', body.end_time)

      return xhr({
        method: 'post',
        url: 'om/getStatistics',
        apiCode: 304,
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

  updateUserNum = ({context, body}) => {
    return new Promise((resolve, reject) => {
      return xhr({
        method: 'post',
        url: 'om/updateUserNum',
        apiCode: 302,
        context
      }).then((res) => {
        return resolve(res)
      }).catch((err) => {
        return reject(context.$root.i18n(ERROR_CODES[err.toString()] || err))
      })
    })
  }

  editSiteQuota = ({context, body}) => {
    return new Promise((resolve, reject) => {
      let data = new FormData()
      data.append('site', body.site)
      data.append('quota', body.quota)
      data.append('quota_temporary', body.quota_temporary)

      return xhr({
        method: 'post',
        url: 'om/editSiteQuota',
        apiCode: 305,
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

export default new SiteService()
