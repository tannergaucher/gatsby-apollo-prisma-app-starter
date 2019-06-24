import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { useQuery } from "@apollo/react-hooks"

import { IS_LOGGED_IN } from "../components/apollo/graphql"
import { useSkyImage } from "../components/hooks/use-sky-image"

export default function ProtectedRoute() {
  // prettier-ignore
  const { data: { isLoggedIn } } = useQuery(IS_LOGGED_IN)

  return isLoggedIn ? <Protected /> : <NotProtected />
}

function Protected() {
  const file = useSkyImage()
  return (
    <>
      <h2>Welcome to the club. You can only see me when you're logged in.</h2>
      <Img fluid={file.childImageSharp.fluid} />
      <br />
    </>
  )
}

function NotProtected() {
  return (
    <>
      <h3>You must log in to view this content</h3>
      <Link to="/login">Log In</Link>
    </>
  )
}
