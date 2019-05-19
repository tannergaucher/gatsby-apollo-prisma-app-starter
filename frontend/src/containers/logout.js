import React from "react"
import { ApolloConsumer } from "react-apollo"

export default function logout() {
  return (
    <ApolloConsumer>
      {client => (
        <button
          onClick={() => {
            client.resetStore()
            localStorage.clear()
          }}
        >
          Logout
        </button>
      )}
    </ApolloConsumer>
  )
}
