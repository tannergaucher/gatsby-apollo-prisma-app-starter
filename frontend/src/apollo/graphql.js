import gql from "graphql-tag"

// I stay client side
export const IS_LOGGED_IN = gql`
  query IS_LOGGED_IN {
    isLoggedIn @client
  }
`

//  I go to the backend
export const HELLO_MESSAGE_QUERY = gql`
  query HELLO_MESSAGE_QUERY {
    hello
  }
`
