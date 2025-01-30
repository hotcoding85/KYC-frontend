"use client";
import React from "react";
import Container from "@/components/Container/Container";
import PaymentLinkGenerator from "@/components/orders/CreatePaymentLink";

export default function PaymentLinkPage() {
  return (
    <Container pageName={"Orders"}>
      <div className="flex flex-col gap-y-2 gap-x-4">
        <PaymentLinkGenerator />
      </div>
    </Container>
  );
}
