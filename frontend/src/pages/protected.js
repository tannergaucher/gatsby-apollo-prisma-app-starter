import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { useQuery } from "react-apollo-hooks"

import Layout from "../components/layout"
import { IS_LOGGED_IN } from "../apollo/graphql"
import { useSkyImage } from "../hooks/use-sky-image"

export default function ProtectedRoute() {
  // prettier-ignore
  const { data: { isLoggedIn } } = useQuery(IS_LOGGED_IN)

  return (
    <Layout>
      {/* @client query checks local storage for a JWT */}
      {isLoggedIn ? <Protected /> : <NotProtected />}
    </Layout>
  )
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
      <h2>Oops, log in to view this page</h2>
      <br />
      <Link to="/login">Log In</Link>
    </>
  )
}
