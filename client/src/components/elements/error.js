import React from "react"

export default function Error({ error }) {
  return <p style={{ color: "var(--warning)" }}>{error.message}</p>
}
