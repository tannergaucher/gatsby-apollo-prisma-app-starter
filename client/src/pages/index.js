import React from "react"
import { Link } from "gatsby"

import { SEO } from "../components/elements"

const IndexPage = () => (
  <>
    <SEO title="Home" />
    <h3>Static Index Page</h3>
    <Link to="/protected">This page has content for logged in users</Link>
  </>
)

export default IndexPage
