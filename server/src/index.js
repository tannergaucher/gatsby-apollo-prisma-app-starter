const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated')
const { resolvers } = require('./prisma/resolvers')

require('dotenv').config()

const server = new GraphQLServer({
  typeDefs: 'src/prisma/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    }
  },
})

server.start(
  {
    cors: {
      credentials: true,
      origin: 'http://localhost:8000',
    },
  },
  details => {
    console.log(`Server is running on http://localhost:${details.port}`)
  }
)
