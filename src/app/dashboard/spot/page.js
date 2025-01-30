"use client";
import Container from "@/components/Container/Container";
import ChartNavigation from "@/components/Spot/ChartNavigation";
import CryptoAssets from "@/components/Spot/CryptoAssets";
import SpotHeader from "@/components/Spot/Header";
import OpenOrders from "@/components/Spot/OpenOrders";
import OrderBook from "@/components/Spot/OrderBook";
import TradingForm from "@/components/Spot/TradingForm";

export default function SpotPage() {
  return (
    <Container pageName={"Dashboard"}>
      <div className="flex flex-col gap-2">
        <SpotHeader />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2">
          <div className="space-y-2">
            <ChartNavigation />
            <OpenOrders />
          </div>
          <OrderBook />
          <div className="space-y-2">
            <TradingForm />
            <CryptoAssets />
          </div>
        </div>
      </div>
    </Container>
  );
}
