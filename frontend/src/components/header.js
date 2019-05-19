import { Link } from "gatsby"
import React from "react"
import { useQuery } from "react-apollo-hooks"

import { useSiteMetadata } from "../hooks/use-site-metadata"
import { IS_LOGGED_IN } from "../apollo/graphql"
import Logout from "../containers/logout"

export default function Header() {
  const { title } = useSiteMetadata()

  const {
    data: { isLoggedIn },
  } = useQuery(IS_LOGGED_IN)

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "var(--one)",
        background: "var(--light-2)",
        fontWeight: "lighter",
      }}
    >
      <Link to="/">{title}</Link>
      {isLoggedIn ? <Logout /> : <Link to="/login">Log in</Link>}
    </header>
  )
}
