import express from 'express'
import React from 'react'
// import { Provider } from 'react-redux'
import { renderToStaticMarkup } from 'react-dom/server'
import App from './../../app/components/App/App'
import { purgeCache } from './../utils/index'

const router = express.Router()
// const assetUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : '/'

// const renderHTML = (componentHTML, initialState, inlineCss) => `
// <!DOCTYPE html>
//   <html lang="en">
//   <head>
//       <link rel="shortcut icon" href="data:image/x-icon;," type="image/x-icon" />
//       <meta charset="utf-8" />
//       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//       <title>Hello React</title>
//       <style type="text/css">${inlineCss}</style>
//   </head>
//   <body>
//     <div id="root">${componentHTML}</div>
//     <script>
//         window.__INITIAL_STATE__ = ${JSON.stringify(initialState).replace(/</g, '\\u003c')}
//       </script>
//     <script type="application/javascript" src="/build.js"></script>
//   </body>
// </html>
// `

router.get('*', (req, res) => {
  let scripts = []
  let styles = []
  if (process.env.NODE_ENV === 'development') {
    [
      './../../app/components/HTML/HTML',
    ].forEach(purgeCache)

    let mainChunk = res.locals.webpackStats.toJson().assetsByChunkName.main
    if (!Array.isArray(mainChunk)) mainChunk = [mainChunk]
    scripts = scripts.concat(mainChunk.filter(e => e.slice(-3) === '.js'))
    styles = styles.concat(mainChunk.filter(e => e.slice(-4) === '.css'))
  } else {
    scripts = ['build.js']
    styles = ['styles.css']
  }
    /* eslint-disable global-require */
  const Html = require('./../../app/components/HTML/HTML').default
  // const routes = require('../../app/routes').default
  // const Html = require('../../app/components/Html').default
  /* eslint-enable global-require */
  // const mainChunk = res.locals.webpackStats.toJson().assetsByChunkName.main

  const inlineCss = global.inlineCss
  const componentHTML = renderToStaticMarkup(
    <Html scripts={scripts} styles={styles} inlineStyles={inlineCss}>
      <App />
    </Html>,
  )
  return res.send(`<!doctype html>${componentHTML}`)
})

export default router
