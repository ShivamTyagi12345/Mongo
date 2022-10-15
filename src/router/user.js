/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
 async function routes (fastify, options) {
  const collection = fastify.mongo.db.collection('test')

  fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  })

  fastify.get('/read', async (request, reply) => {
    const result = await collection.find().toArray()
    if (result.length === 0) {
      throw new Error('No documents found')
    }
    return result
  })

  fastify.post('/create', async (request, reply) => {
    const result = await collection.insert().toArray({
      name: 'shivam taygi',
      email:'backend@gmail.com',
      password:'1234'
    })
    return result
  })

  fastify.get('/users/:id', async (request, reply) => {
    const result = await collection.findOne({ animal: request.params._id })
    if (!result) {
      throw new Error('Invalid value')
    }
    return result
  })

  const animalBodyJsonSchema = {
    type: 'object',
    required: ['animal'],
    properties: {
      animal: { type: 'string' },
    },
  }

  const schema = {
    body: animalBodyJsonSchema,
  }

  fastify.post('/users', { schema }, async (request, reply) => {
    // we can use the `request.body` object to get the data sent by the client
    const result = await collection.insertOne({ animal: request.body.animal })
    return result
  })
}

module.exports = routes