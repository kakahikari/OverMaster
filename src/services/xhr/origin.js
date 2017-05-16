import { ERROR_CODES, XHR_TIMEOUT } from './config'
import { API_URL } from 'src/config'
import { readCookie } from '../'
import axios from 'axios'

const xhr = async ({ context, url = '/', method = 'get', apiCode, data = null, needToken = true }) => {
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
        'Api-Code': apiCode
      },
      withCredentials: true
    }
    if (needToken && !apiToken) return reject('1006')
    if (needToken) options.headers['Api-Token'] = apiToken

    axios(options).then((res) => {
      if (res.data.error_code === '1') {
        return resolve(res.data.result)
      }

      console.warn && console.warn(ERROR_CODES[res.data.error_msg.toString()])
      if (res.data.error_msg === '1006') context.$root.default && context.$root.default()
      return reject(res.data.error_msg)
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
