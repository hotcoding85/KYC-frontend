"use client";
import React from "react";
import NavBar from "@/components/NavBar/NavBar";

export default function Container({ children, pageName }) {
  return (
      <NavBar pageName={pageName}>
        <div className="px-1 md:px-3 pb-2">
          {children}
          {/* <Widget></Widget> */}
        </div>
      </NavBar>
  );
};
