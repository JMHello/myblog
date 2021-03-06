const NODE_ENV = process.env.NODE_ENV
const config = require("./config")

if (NODE_ENV == 'production') {
  const prodServer = require("./server/server.prop")

  prodServer(config.cmsPort)
} else {
  const devServer = require("./server/server.dev")

  devServer(config.dev.cmsServerPort)
}