import React from "react"

import { useSiteMetadata } from "../hooks/use-site-metadata"

export default function footer() {
  const { title } = useSiteMetadata()

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "var(--one)",
        background: "var(--light-2)",
        fontWeight: "lighter",
      }}
    >
      {title}
    </div>
  )
}
