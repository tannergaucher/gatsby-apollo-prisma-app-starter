import React from "react"
import { useQuery } from "react-apollo-hooks"

import { HELLO_MESSAGE_QUERY } from "../apollo/graphql"

export default function HelloMessage() {
  const { data, loading, error } = useQuery(HELLO_MESSAGE_QUERY)

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>

  return (
    <>
      <p style={{ fontFamily: "var(--serif)" }}>{data.hello}</p>
    </>
  )
}
