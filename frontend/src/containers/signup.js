import React, { useState } from "react"
import { Mutation, ApolloConsumer } from "react-apollo"
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
  const [values, setValues] = useState({ name: "", email: "", password: "" })

  const handleChange = e => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  return (
    <ApolloConsumer>
      {client => (
        <Mutation mutation={SIGN_UP_MUTATION} variables={values}>
          {(signup, { loading, error }) => (
            <form
              method="post"
              onSubmit={async e => {
                e.preventDefault()
                const res = await signup()
                client.writeData({ data: { isLoggedIn: true } })
                localStorage.setItem("token", res.data.signup.token)
                setValues({ name: "", email: "", password: "" })
                navigate(`/`)
              }}
            >
              <fieldset disabled={loading}>
                <h2>Sign up for an account</h2>
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

                <label htmlFor="name">
                  <input
                    type="text"
                    name="name"
                    placeholder="name"
                    value={values.name}
                    onChange={handleChange}
                  />
                </label>
                <button type="submit" disabled={loading}>
                  sign up
                </button>
              </fieldset>
            </form>
          )}
        </Mutation>
      )}
    </ApolloConsumer>
  )
}
