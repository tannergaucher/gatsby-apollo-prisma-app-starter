import React from "react"

import { Login, Signup } from "../user"

export default function Auth() {
  return (
    <>
      <h1>Please Log In</h1>
      <Login />
      <Signup />
    </>
  )
}
