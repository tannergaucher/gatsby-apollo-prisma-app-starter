import React from "react"
import { ApolloProvider } from "@apollo/react-hooks"

import { client } from "./src/components/apollo/client"
import { Layout } from "./src/components/elements"

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    <Layout>{element}</Layout>
  </ApolloProvider>
)
