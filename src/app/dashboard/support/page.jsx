"use client"
import React, { useEffect, useRef, useState } from "react";
import NavBar from "@/components/NavBar/NavBar";
import SupportBody from "@/components/Support/SupportBody";

export default function SupportPage() {
  return (
    <>
      <NavBar pageName="Support" >
        <SupportBody />
      </NavBar>
    </>
  )
}
