import React from "react"
import PropTypes from "prop-types"

import Header from "./header"
import Footer from "./Footer"
import "./layout.css"

const Layout = ({ children }) => (
  <div
    style={{
      display: "grid",
      gridTemplateRows: "auto 1fr auto",
      minHeight: "100vh",
    }}
  >
    <Header />
    <main
      style={{
        padding: "var(--one)",
        maxWidth: "var(--container)",
        margin: "var(--one) auto",
      }}
    >
      {children}
    </main>
    <Footer />
  </div>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
