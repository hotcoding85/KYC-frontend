import Image from "next/image";
import Btc from "@/Icons/imageicon/Btc";

export const BalanceComponent = () => {
  const balances = [
    { name: "BTC", amount: "1,000.00", icon: "/icons/bitcoin.png" },
    { name: "Litecoin", amount: "1,000.00", icon: "/icons/litecoin.png" },
    { name: "BTC", amount: "1,000.00", icon: "/icons/bitcoin.png" },
    { name: "ETH", amount: "1,000.00", icon: "/icons/ethereum.png" },
    { name: "USDT", amount: "1,000.00", icon: "/icons/usdt.png" },
    { name: "USDT", amount: "1,000.00", icon: "/icons/usdt.png" },
    { name: "Litecoin", amount: "1,000.00", icon: "/icons/litecoin.png" },
    { name: "USDT", amount: "1,000.00", icon: "/icons/usdt.png" },
    { name: "Litecoin", amount: "1,000.00", icon: "/icons/litecoin.png" },
    { name: "USDT", amount: "1,000.00", icon: "/icons/usdt.png" },
    { name: "Litecoin", amount: "1,000.00", icon: "/icons/litecoin.png" },
  ];

  return (
    <div className="w-full p-4 bg-white rounded-xl h-full">
    <h2 className="text-[14px] font-semibold leading-[20px] tracking-[-0.005em] text-left mb-[20px] text-textBlack">
      Balance
    </h2>
      <div className="flex justify-between gap-[52px]">
      
        <h2 className="text-[12px] font-semibold leading-[16px] text-left font-inter  text-textBlack">Total Balance</h2>
        <p className="font-semibold text-xs leading-[16px] text-right">1,200,000 USD</p>
      </div>
      <div className="mt-3 flex flex-col gap-3">
        {balances.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <Btc className="w-[20px] h-[20px]" />
              <span className="text-[12px] font-medium leading-[16px] text-left text-textSecondary font-inter">{item.name}</span>
            </div>
            <span className="text-[12px] font-semibold leading-[16px] text-right font-inter text-textBlack">{item.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
