const { prisma } = require('../src/generated/prisma-client')

async function main() {
  await prisma.createUser({
    email: 'tanner@tanner.com',
    name: 'Tanner',
    password: 'some_hashed_password123',
  })

  await prisma.createUser({
    email: 'mike@mike.com',
    name: 'Mike',
    password: 'some_hashed_password345',
  })

  await prisma.createUser({
    email: 'jane@jane.com',
    name: 'Jane',
    password: 'some_hashed_password567',
  })

  await prisma.createUser({
    email: 'jo@jo.com',
    name: 'Jo',
    password: 'some_hashed_password789',
  })
}

main().catch(e => console.error(e))
