import React from "react";
import Image from "next/image";
import SessionItem from "@/components/Settings/SessionItem";
import SessionsTab from "@/components/Settings/SessionsTab";

const SessionsContent = ({user_id, fetchCustomerDetails}) => {
  return (
    <>
      <SessionsTab user_id={user_id} fetchCustomerDetails={fetchCustomerDetails}/>
    </>
  );
};

export default SessionsContent;
