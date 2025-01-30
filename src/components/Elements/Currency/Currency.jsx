import React from "react";
import { currency as Currencies } from "@/data/Currency/Currency";

const Currency = ({ children, currency = "USD" }) => {
 
  const currencyData = Currencies.find((cur) => cur.code === currency);
  const symbol = currencyData ? currencyData.symbol : "$";
  const code = currencyData ? currencyData.code : "USD";

  const formattedValue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: code,
    minimumFractionDigits: 2,
  }).format(children || "0.00");

  return (
    <span>
      {formattedValue.replace(
          new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: code,
          }).format(2),
          ""
        )}
    </span>
  );
};

export default Currency;
