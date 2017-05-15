import { ERROR_CODES, XHR_TIMEOUT } from './config'
import { API_URL, SITE_DOMAIN } from 'src/config'
import { readCookie } from '../'
import axios from 'axios'

const xhr = async ({ context, url = '/', method = 'get', data = null, needToken = true }) => {
  const apiToken = await readCookie('apiToken')

  return new Promise((resolve, reject) => {
    const outOfSite = url.includes('://')
    const actionUrl = outOfSite ? url : API_URL + '/' + url
    let options = {
      method: method,
      url: actionUrl,
      data: data,
      timeout: XHR_TIMEOUT,
      headers: {
        'cache-control': 'no-cache',
        'site-domain': SITE_DOMAIN
      },
      withCredentials: true
    }
    if (needToken && !apiToken) return reject('1006')
    if (needToken) options.headers['Api-Token'] = apiToken

    axios(options).then((res) => {
      if (res.data.error_code === '0') {
        return resolve(res.data.result)
      }

      console.warn && console.warn(ERROR_CODES[res.data.error_code.toString()])
      if (res.data.error_code === '1006') context.$root.default && context.$root.default()
      return reject(res.data.error_code)
    })
    .catch((error) => {
      if (error.response) {
        return reject('http-' + error.response.status)
      } else if (error.code === 'ECONNABORTED') {
        return reject('v-timeout')
      } else {
        console.warn && console.warn(error.message)
      }
    })
  })
}

export default xhr
