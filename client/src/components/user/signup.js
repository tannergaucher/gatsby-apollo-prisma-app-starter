import React, { useState } from "react"
import { useMutation, useApolloClient } from "@apollo/react-hooks"
import gql from "graphql-tag"
import { navigate } from "@reach/router"

const SIGN_UP_MUTATION = gql`
  mutation SIGN_UP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    signup(name: $name, email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`

export default function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [signup, { loading, error }] = useMutation(SIGN_UP_MUTATION, {
    variables: { email, password },
  })

  const client = useApolloClient()

  return (
    <fieldset disabled={loading}>
      <h2>Sign up for an account</h2>
      {error && <p style={{ color: "var(--warning)" }}>{error.message}</p>}
      <form
        method="post"
        onSubmit={async e => {
          e.preventDefault()
          const res = await signup()
          client.writeData({ data: { isLoggedIn: true } })
          localStorage.setItem("token", res.data.signup.token)
          navigate(`/`)
        }}
      >
        <label htmlFor="email">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" disabled={loading}>
          Sign Up
        </button>
      </form>
    </fieldset>
  )
}
