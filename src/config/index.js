// ESM
import fastifyPlugin from 'fastify-plugin'
import fastifyMongo from '@fastify/mongodb'

async function dbConnector (fastify, options) {
  fastify.register(fastifyMongo, {
    url: 'mongodb://localhost:27017/test'

  })
//   console.log("database connected successfully...")
}

module.exports = fastifyPlugin(dbConnector)
