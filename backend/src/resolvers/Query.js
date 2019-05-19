const { getUserId, AuthError } = require('../utils/getUserId')

const Query = {
  me: async (parent, args, context) => {
    const userId = getUserId(context)

    if (!userId) {
      return null
    }

    return context.prisma.user({ id: userId })
  },
  users: async (parent, args, context) => {
    return context.prisma.users()
  },
  hello: (parent, args, context) => {
    return `And I'm data fetched from the Prisma Backend 👋`
  },
}

module.exports = {
  Query,
}
