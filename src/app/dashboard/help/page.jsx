"use client"
import React from "react"
import NavBar from "@/components/NavBar/NavBar"
import HelpCenterBody from "@/components/HelpCenter/HelpCenterBody"

export default function HelpCenterPage() {

  return (
    <>
      <NavBar pageName="Help & Support">
        <HelpCenterBody />
      </NavBar>
    </>
  )
}
