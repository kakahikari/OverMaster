require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')

console.log(
  `\n`+
  `\n`+
  `                       _oo0oo_\n`+
  `                      o8888888o\n`+
  `                      88" . "88]\n`+
  `                      (| -_- |)\n`+
  `                      0\  =  /0\n`+
  `                    ___/'---'\___\n`+
  `                  .' \\|     |// '.\n`+
  `                 / \\|||  :  |||// \ \n`+
  `                / _||||| -:- |||||- \ \n`+
  `               |   | \\\  -  /// |   |\n`+
  `               | \_|  ''\---/''  |_/ |\n`+
  `               \  .-\__  '-'  ___/-. /\n`+
  `             ___'. .'  /--.--\  '. .'___\n`+
  `          ."" '<  '.___\_<|>_/___.' >' "".\n`+
  `         | | :  '- \'.;'\ _ /';.'/ - ' : | |\n`+
  `         \  \ '_.   \_ __\ /__ _/   .-' /  /\n`+
  `     ====='-.____'.___ \_____/___.-'___.-'=====\n`+
  `                       '=---='\n`+
  `\n`+
  `\n`+
  `               佛祖保佑         永無BUG\n`+
  `\n`
)
var spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
