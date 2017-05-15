let _API_URL = process.argv[2]
let _SITE_DOMAIN = process.argv[3]
let _DEFAULT_LNG
if (process.argv[4] === undefined) {
  _DEFAULT_LNG = 'cn'
} else {
  _DEFAULT_LNG = 'en'
}

let today = new Date()
let _BUILD_DATE = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}`

let content =
`export const BUILD_DATE = '${_BUILD_DATE}'\n` +
`export const API_URL = '${_API_URL}'\n` +
`export const SITE_DOMAIN = '${_SITE_DOMAIN}'\n` +
`export const DEFAULT_LNG = '${_DEFAULT_LNG}'\n`

var fs = require('fs')

let setConfig = () => {
  fs.writeFile('src/config.js', content, 'utf-8', (err) => {
    if (err) throw err
    console.log(`
      ******************************
        > BUILD_DATE: ${_BUILD_DATE}
        > API_URL: ${_API_URL}
        > SITE_DOMAIN: ${_SITE_DOMAIN}
        > DEFAULT_LNG: ${_DEFAULT_LNG}
      ******************************
    `)
  })
}

setConfig()
