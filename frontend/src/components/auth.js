import React from "react"

import Login from "../containers/login"
import Signup from "../containers/signup"

export default function Auth() {
  return (
    <>
      <h1>Please Log In</h1>
      <Login />
      <Signup />
    </>
  )
}
