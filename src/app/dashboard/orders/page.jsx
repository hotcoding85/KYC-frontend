"use client"
import React, { useState } from "react";
import Container from "@/components/Container/Container";
import RecentOrdersTable from "@/components/orders/OrdersTable";
import OrderCards from "@/components/orders/OrderCards";

export default function OrdersPage() {
  const [dummyData, setDummyData] = useState([
    {
      id: "302012",
      source: "www.farfetch.com",
      amount: 12.12,
      currency: "BTC",
      status: "Completed",
      created_at: "2024-01-08",
      transaction_hash: "0x7d916f7f37c9c9c9b9c9c9c9c9c9c9c9c9c9c9c9",
    },
    {
      id: "302013",
      source: "Farfetch - APP",
      amount: 12.12,
      currency: "BTC",
      status: "Failed",
      created_at: "2024-01-08",
      transaction_hash: "0x8d926f7f37c9c9c9b9c9c9c9c9c9c9c9c9c9c9c9",
    },
    {
      id: "302014",
      source: "shop.nike.com",
      amount: 8.45,
      currency: "BTC",
      status: "Completed",
      created_at: "2024-01-07",
      transaction_hash: "0x9d936f7f37c9c9c9b9c9c9c9c9c9c9c9c9c9c9c9",
    },
    {
      id: "302015",
      source: "amazon.com",
      amount: 15.30,
      currency: "BTC",
      status: "Pending",
      created_at: "2024-01-07",
      transaction_hash: "0x1d946f7f37c9c9c9b9c9c9c9c9c9c9c9c9c9c9c9",
    },
    {
      id: "302016",
      source: "aliexpress.com",
      amount: 5.99,
      currency: "BTC",
      status: "Completed",
      created_at: "2024-01-06",
      transaction_hash: "0x2d956f7f37c9c9c9b9c9c9c9c9c9c9c9c9c9c9c9",
    }
  ]);;


  return (
    <Container pageName={"Orders"}>
      <div className="flex flex-col gap-y-2 gap-x-4">
        <OrderCards />
        <RecentOrdersTable orders={dummyData} />
      </div>
    </Container>
  );
}

