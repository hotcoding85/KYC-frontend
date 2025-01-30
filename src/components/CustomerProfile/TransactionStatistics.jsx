const transactionData = [
  { label: "Beneficiaries", value: "12" },
  { label: "Benefactors", value: "12" },
  { label: "Approved Transactions", value: "XX XXX XXXX" },
  { label: "Pending Transactions", value: "XX XXX XXXX" }
];

const transactionDataTwo = [
  { label: "Declined Transactions", value: "12" },
  { label: "Total Amount In", value: "12" },
  { label: "Total Amount Out", value: "XX XXX XXXX" },
]

export const TransactionStatistics = () => {
  return (
    <div className="w-full p-4 bg-white rounded-xl">
      <h2 className="mb-3 text-[14px] font-semibold leading-[20px] tracking-[-0.005em] text-left mb-[20px] text-textBlack">Transaction Statistics</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex justify-between">
          <p className="text-[12px] font-semibold leading-[16px] text-left text-textBlack font-inter">Total Transaction Value</p>
          <h3 className="font-semibold text-xs leading-[16px] text-right">1,200 BTC</h3>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-10'>
        <div className="flex flex-col gap-3 mt-3 text-xs">
          {transactionData.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span className="font-medium text-[12px] leading-[16px] text-left text-textSecondary mb-[10px]">{item.label}</span>
              <span className="font-semibold text-[12px] leading-[16px] text-right text-textSecondary">{item.value}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3 mt-3 text-xs">
          {transactionDataTwo.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span className='font-medium text-[12px] leading-[16px] text-left text-textSecondary mb-[10px]'>{item.label}</span>
              <span className="font-semibold text-[12px] leading-[16px] text-right text-textSecondary">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
