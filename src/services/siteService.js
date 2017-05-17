import xhr from './xhr/'
import { ERROR_CODES } from './xhr/config'

class SiteService {
  getSiteList = ({context}) => {
    return new Promise((resolve, reject) => {
      return xhr({
        method: 'post',
        url: 'om/getSiteList',
        apiCode: 301,
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
