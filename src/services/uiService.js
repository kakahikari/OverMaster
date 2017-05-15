import xhr from './xhr/'
import { ERROR_CODES } from './xhr/config'

class UiService {
  getFieldList = ({context, language}) => {
    return new Promise((resolve, reject) => {
      let data = new FormData()
      data.append('lang_code', language)
      return xhr({
        method: 'post',
        url: 'agent/field_list',
        data,
        context
      }).then((res) => {
        return resolve(res)
      }).catch((err) => {
        return reject(context.$root.i18n(ERROR_CODES[err.toString()] || err))
      })
    })
  }

  getTemplate = ({context, actionKey}) => {
    return new Promise((resolve, reject) => {
      let data = new FormData()
      data.append('action_key', actionKey)
      return xhr({
        method: 'post',
        url: 'agent/column',
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

export default new UiService()
