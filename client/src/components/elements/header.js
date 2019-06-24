import { Link } from "gatsby"
import React from "react"
import { useQuery } from "@apollo/react-hooks"

import { IS_LOGGED_IN } from "../apollo/graphql"
import { Logout } from "../user"

export default function Header() {
  // prettier-ignore
  const { data: { isLoggedIn }} = useQuery(IS_LOGGED_IN)

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
      <Link to="/">Header</Link>
      {isLoggedIn ? <Logout /> : <Link to="/login">Log in</Link>}
    </header>
  )
}
