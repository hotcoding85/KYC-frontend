import React from "react";
import LiquidityProviderCard from "./LiquidityProviderCard";

export default function LiquidityOverview({
  openEditModal,
  liquidityState,
  openDeleteModal,
  setSingleLiquidityState,
  handleSetSelectedLiquidity,
}) {
  return (
    <>
      <div className="flex flex-row items-center gap-4">
        {liquidityState &&
          liquidityState.map((each, idx) => (
            <LiquidityProviderCard
              key={idx}
              singleLiquidityState={each}
              openEditModal={openEditModal}
              openDeleteModal={openDeleteModal}
              setSingleLiquidityState={setSingleLiquidityState}
              handleSetSelectedLiquidity={handleSetSelectedLiquidity}
            />
          ))}
      </div>
    </>
  );
}
