"use client";
import React, {useEffect, useState, useCallback} from "react";
import NavBar from "@/components/NavBar/NavBar";
import ProfileBody from "@/components/Profile/ProfileBody";
import { useUser } from "@/app/context/UserContext";
import useApi from "@/hooks/useApi";

export default function ProfilePage() {
  const { user, fetchUser } = useUser();
  const [customerDetails, setcustomerDetails] = useState({})
  useEffect(() => {
    if (user) {
      setcustomerDetails(user)
    }
  }, [user])
  
  const fetchCustomerDetails = async () => {
    await fetchUser()
  }

  return (
    <>
      <NavBar pageName={"Company Management "}>
        <ProfileBody customerDetails={user} fetchCustomerDetails={fetchCustomerDetails} />
      </NavBar>
    </>
  );
}
