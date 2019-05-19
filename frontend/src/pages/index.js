import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import HelloMessage from "../components/hello-message"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi there</h1>
    <p style={{ fontFamily: "var(--serif)" }}>
      I'm static content from gatsby 🕵️‍♂️
    </p>
    <HelloMessage />
    <Link to="/protected">This page has content for logged in users</Link>
  </Layout>
)

export default IndexPage
