import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { log } from 'tiny-typescript-logger'

const app = express()
const port = 9898

app.get('/', (request, response) => {
  response.send('Hello World!')
})

app.use(
  '/app/_stcore/stream',
  createProxyMiddleware({
    changeOrigin: true, // Needed to support virtual hosted services
    pathRewrite: { '^/app': '' },
    target: 'ws://localhost:8080', // Target WebSocket server
    ws: true, // Enable WebSocket proxying
    on: {
      error: (err, request, response) => {
        log.error(`[PROXY] ${err}`)
      },
      proxyReqWs: (proxyRequest, request, socket, options, head) => {
        log.info(`[PROXY WEBSOCKET] ${request.url}`)

        // Add the auth token to the request headers
        proxyRequest.setHeader(
          'Authorization',
          'Bearer 635b2d0162f046179b7fe0e6f977cb88'
        )
      }
    }
  })
)

app.use(
  '/app',
  createProxyMiddleware({
    changeOrigin: true, // Changes the origin of the host header to the target URL
    logLevel: 'debug', // Enable detailed logging
    pathRewrite: { '^/app': '' }, // Remove the '/app' prefix from the URL
    target: 'http://localhost:8080', // Target server
    on: {
      error: (err, request, response) => {
        log.error(`[PROXY] ${err}`)
      },
      proxyReq: (proxyRequest, request, response) => {
        log.info(`[PROXY] ${request.url}`)

        // Add the auth token to the request headers
        proxyRequest.setHeader(
          'Authorization',
          'Bearer 635b2d0162f046179b7fe0e6f977cb88'
        )
      }
    }
  })
)

app.listen(port, () => {
  log.info(`Example app listening on port ${port}. 🚀 `)
})
