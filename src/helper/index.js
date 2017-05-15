import numeral from 'numeral'
import translation from 'src/locales'
import { DEFAULT_LNG } from 'src/config'

String.prototype.currency = function ({sign = '', format = '0,0.00'}) {
  const out = numeral(this).format(sign + format)
  return out
}

String.prototype.toNumber = function ({format = '0.00'}) {
  const out = numeral(this).format(format)
  return out
}

import i18next from 'i18next'
i18next.init({
  // debug: process.env.NODE_ENV === 'development',
  lng: DEFAULT_LNG,
  resources: translation
})

const env = process.env.NODE_ENV

export default {
  log (val) {
    if (env === 'development') {
      console.log(val)
    }
  },
  i18n (str, lng = DEFAULT_LNG) {
    return i18next.t(str, {lng: lng})
  }
}
