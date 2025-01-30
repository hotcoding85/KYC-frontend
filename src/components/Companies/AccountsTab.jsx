"use client";
import AllAccounts from "@/components/Home/AllAccounts/AllAccounts";
import React, { useState, useEffect, useRef } from "react";
import CompanyAccounts from "./CompanyAccounts/CompanyAccounts";
import useApi from "@/hooks/useApi";
import { useParams } from "next/navigation";
import { Toast } from "primereact/toast";
import AllCards from "../Home/AllCards/AllCards";

export default function AccountsTab({ company_id }) {
  const { fetchData, loading, error } = useApi();
  const params = useParams();
  const companyId = params?.id;
  const toast = useRef(null);

  const [accounts, setAccounts] = useState([]);

  const fetchAccounts = async () => {
    const { result, error } = await fetchData(
      `/account/company/${company_id}`,
      {
        method: "GET",
      }
    );

    if (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to fetch accounts",
        life: 3000
      });
    } else {
      setAccounts(result);
    }
  };

  useEffect(() => {
    if (!company_id) return
    fetchAccounts();
  }, [company_id]);

  return (
    <div className="flex flex-col gap-2">
      <Toast ref={toast} />
      <AllAccounts user_id={accounts[0]?.user?.user_id || ''} />
      <AllCards user_id={accounts[0]?.user?.user_id || ''} />
    </div>
  );
}
