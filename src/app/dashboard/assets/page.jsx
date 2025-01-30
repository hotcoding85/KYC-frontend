"use client";
import React, { useEffect, useRef, useState } from "react";
import Container from "@/components/Container/Container";
import List from "@/components/Assets/List";

import useApi from "@/hooks/useApi";

export default function AssetsPage() {
  const { fetchData, loading, error } = useApi();
  const [assets, setAssets] = useState(null);

  async function fetchListAssets() {
    const { result, error } = await fetchData(`/asset/all`, {
      method: "GET",
    });
    if (error) {
      setAssets([]);
    } else {
      setAssets(result);
    }
  }

  useEffect(() => {
    fetchListAssets();
  }, []);

  return (
    <Container pageName={"Assets"}>
      <List assets={assets} fetchListAssets={() => fetchListAssets()} />
    </Container>
  );
}
