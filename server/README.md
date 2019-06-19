# GraphQL Backend Boilerplate

GraphQL Yoga Server 🧘 + Prisma DB 💾 + JWT authentication 🔑

---

## Installation

Remove `.sample` suffix from the environment variables file to make it `.env`

`npm install`

`npm install -g prisma` to make sure prisma CLI is installed globally

`prisma login` to authenticate with prisma from the CLI

`prisma deploy` to datamodel to prisma to demo cloud server

- Key down to select demo server option:

- **_'Or deploy to an existing Prisma server:"_**

- Then choose:

- **_Demo server + MySQL database in Prisma Cloud_**

`enter` to select region and default server names

`prisma seed` Seed the database with mocked user data from '/prisma/seed.js' by running

`npm start` visit http://localhost:4000 to view the api in GraphQL Playground

## Testing the API with GraphQL Playground

### Query the seeded users from the database

```graphql
{
  users {
    id
    name
    password
    email
  }
}
```

### Create a user with the `signup` mutation

```graphql
mutation {
  signup(email: "FOO@FOO.com", password: "FOO", name: "Foo") {
    token
    user {
      id
      name
      email
      password
    }
  }
}
```

### Form an authenticated query using HTTP headers

Copy the token returned from the above `signup` mutation and place in the HTTP Headers section of the GraphQL playground like so:

```json
{
  "Authorization": "Bearer <TOKEN>"
}
```

Note the space between Bearer and token

### Open up a new tab in the playground and test the authorized `me` query

```graphql
{
  me {
    id
    name
    password
    email
  }
}
```

This query gets the user id from the JWT pasted into the headers and returns that user

---

Next Steps

When creating relations in the datamodel, [type resolvers](https://www.prisma.io/tutorials/a-guide-to-common-resolver-patterns-ct08) must be added to `/src/resolvers` in order to resolve nested relations

For example, we add a relation between type User and type List to the datamodel

```
type User {
  id: ID! @id
  name: String!
  email: String! @unique
  password: String!
  lists: [List!]  # relation to List
}

type List {
  id: ID! @id
  title: String!
  user: User!  # relation to User
}
```

After creating data for that relation, in order to query the lists of a User, add a type resolver to `/src/resolvers`

Inside `/src/resolvers/User.js`

```js
const User = {
  lists: ({ id }, args, context) => {
    return context.prisma.user({ id }).lists()
  },
}

module.exports = {
  User,
}
```

Inside `/src/resolvers/List.js`

```js
const List = {
  user: ({ id }, args, context) => {
    return context.prisma.list({ id }).user()
  },
}

module.exports = {
  List,
}
```

Finally, import those relations into `/src/resolvers/index.js`

```js
const { Query } = require('./Query')
const { Mutation } = require('./Mutation')
const { User } = require('./User')
const { List } = require('./List')

const resolvers = {
  Query,
  Mutation,
  User,
  List,
}

module.exports = {
  resolvers,
}
```
