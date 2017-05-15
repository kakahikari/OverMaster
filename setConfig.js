let _API_URL = process.argv[2]
let _DEFAULT_LNG
if (process.argv[3] === undefined) {
  _DEFAULT_LNG = 'cn'
} else {
  _DEFAULT_LNG = 'en'
}

let today = new Date()
let _BUILD_DATE = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}`

let content =
`export const BUILD_DATE = '${_BUILD_DATE}'\n` +
`export const API_URL = '${_API_URL}'\n` +
`export const DEFAULT_LNG = '${_DEFAULT_LNG}'\n`

var fs = require('fs')

let setConfig = () => {
  fs.writeFile('src/config.js', content, 'utf-8', (err) => {
    if (err) throw err
    console.log(`
      ******************************
        > BUILD_DATE: ${_BUILD_DATE}
        > API_URL: ${_API_URL}
        > DEFAULT_LNG: ${_DEFAULT_LNG}
      ******************************
    `)
  })
}

setConfig()
