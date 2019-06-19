import React, { useState } from "react"
import { useMutation, useApolloClient } from "@apollo/react-hooks"
import gql from "graphql-tag"
import { navigate } from "@reach/router"

const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const client = useApolloClient()
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
    variables: { email, password },
  })

  return (
    <fieldset disabled={loading}>
      <h2>Log in to your accout</h2>
      {error && <p style={{ color: "var(--warning)" }}>{error.message}</p>}
      <form
        onSubmit={async e => {
          e.preventDefault()
          const res = await login()
          // also write user to cache here
          client.writeData({ data: { isLoggedIn: true } })
          localStorage.setItem("token", res.data.login.token)
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
          Login
        </button>
      </form>
    </fieldset>
  )
}
