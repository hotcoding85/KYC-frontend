"use client";
import React from "react";
import NavBar from "@/components/NavBar/NavBar";
import DevelopersComponent from "@/components/Developers";

export default function DevelopersPage() {
  return (
    <NavBar pageName={"Developers"}>
      <div className="px-8 py-4">
        <DevelopersComponent />
      </div>
    </NavBar>
  );
}
