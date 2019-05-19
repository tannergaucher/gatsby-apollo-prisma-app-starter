import React from "react"
import { ApolloProvider } from "react-apollo"
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks"
import { client } from "./src/apollo/client"

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>{element}</ApolloHooksProvider>
  </ApolloProvider>
)
