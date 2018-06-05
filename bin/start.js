// const dev = process.env.NODE_ENV === 'development'
/* global rm mkdir cp */
import 'shelljs/global'
import path from 'path'
import cssHook from 'css-modules-require-hook'
import webpack from 'webpack'
import createConfig, { dist } from '../webpack.config'

const dev = process.env.NODE_ENV === 'development'

// console.log('devdev', dev)

const cssHookConfig = {
  generateScopedName: dev ? '[name]__[local]' : '[hash:base64:5]',
  extensions: ['.scss', '.css'],
}

if (dev) {
  cssHookConfig.processCss = (css = '') => {
    if (!global.inlineCss) global.inlineCss = ''
    global.inlineCss += css
  }
}

cssHook(cssHookConfig)
// console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'production') {
  const config = createConfig({ prod: true })
  const distStaticPath = path.join(dist, 'static')
  const appStaticPath = path.join(__dirname, '../app/static/')

  rm('-rf', dist)
  mkdir(dist)

  webpack(config, (err, stats) => {
    if (err) throw err

    cp('-R', appStaticPath, distStaticPath)
    process.stdout.write(`${stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
    })}\n`)

    require('../server') // eslint-disable-line global-require
  })
} else {
  require('../server') // eslint-disable-line global-require
}
