/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes(fastify, options) {
  const collection = fastify.mongo.db.collection("test");

  fastify.get("/", async (request, reply) => {
    return { hello: "world" };
  });

  fastify.get("/read", async (request, reply) => {
    const result = await collection.find().toArray();
    if (result.length === 0) {
      throw new Error("No documents found");
    }
    return result;
  });

  fastify.post("/create", async (request, reply) => {
    // console.log(request.body)
    const { name, email, password } = request.body;
    // console.log(name);
    // console.log(email);
    // console.log(password);
    const result = await collection.insert({
      name,
      email,
      password,
    });
    return result;
  });

  fastify.put("/update/:id", async (request, reply) => {
    // console.log(request.body)
    const { name, email, password } = request.body;
    console.log(name);
    console.log(email);
    console.log(password);
    const result = await collection.updateOne(
      { _id: request.params.id },
      {
        $set: { name, email, password },
      },
      { upsert: true }
    );
    return result;
  });

  fastify.delete("/delete/:id", async (request, reply) => {
    const result = await collection.deleteOne({ _id: request.params.id });
    return result;
  });

  fastify.get("/users/:id", async (request, reply) => {
    const result = await collection.findOne({ animal: request.params._id });
    if (!result) {
      throw new Error("Invalid value");
    }
    return result;
  });
}

module.exports = routes;
