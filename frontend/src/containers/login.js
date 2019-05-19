import React, { useState } from "react"
import { Mutation, ApolloConsumer } from "react-apollo"
import gql from "graphql-tag"
import { navigate } from "@reach/router"

const LOG_IN_MUTATION = gql`
  mutation LOG_IN_MUTATION($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`

export default function Login() {
  const [values, setValues] = useState({ email: "", password: "" })

  const handleChange = e => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  return (
    <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
      <ApolloConsumer>
        {client => (
          <Mutation mutation={LOG_IN_MUTATION} variables={values}>
            {(login, { loading, error }) => (
              <form
                method="post"
                onSubmit={async e => {
                  e.preventDefault()
                  const res = await login()
                  client.writeData({ data: { isLoggedIn: true } })
                  localStorage.setItem("token", res.data.login.token)
                  navigate(`/`)
                }}
              >
                <fieldset disabled={loading}>
                  <h2>Log in to your accout</h2>
                  {error && (
                    <p style={{ color: "var(--warning)" }}>{error.message}</p>
                  )}
                  <label htmlFor="email">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={values.email}
                      onChange={handleChange}
                    />
                  </label>
                  <label htmlFor="password">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={values.password}
                      onChange={handleChange}
                    />
                  </label>
                  <button type="submit" disabled={loading}>
                    Login
                  </button>
                </fieldset>
              </form>
            )}
          </Mutation>
        )}
      </ApolloConsumer>
    </div>
  )
}
