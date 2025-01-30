import React, { useState } from "react";

const OrderBook = () => {
  const [activeTab, setActiveTab] = useState("Order book");

  // Sample data structure
  const orders = {
    sells: [
      { price: 67018.8, quantity: 0.093238, total: 6248.6989 },
      { price: 67018.7, quantity: 0.001001, total: 67.0857 },
      { price: 67018.5, quantity: 0.437368, total: 29311.7473 },
      { price: 67018.3, quantity: 0.028631, total: 1918.8009 },
      { price: 67018.2, quantity: 0.001039, total: 69.6319 },
      { price: 67018.1, quantity: 5.518062, total: 369810.0309 },
      { price: 67018.09, quantity: 0.001048, total: 70.235 },
      { price: 67016.54, quantity: 0.010354, total: 693.8893 },
      { price: 67016.5, quantity: 0.001036, total: 69.4291 },
      { price: 67016.4, quantity: 0.06578, total: 4408.3388 },
      { price: 67003.59, quantity: 0.000178, total: 11.9266 },
      { price: 67003.52, quantity: 0.002008, total: 134.5431 },
    ],
    currentPrice: 67003.52,
    buys: [
      { price: 67003.51, quantity: 0.005786, total: 387.6823 },
      { price: 67000.0, quantity: 0.000149, total: 9.983 },
      { price: 66998.87, quantity: 0.000149, total: 9.9828 },
      { price: 66995.9, quantity: 0.16214, total: 10862.7152 },
      { price: 66995.7, quantity: 0.017149, total: 1148.9093 },
      { price: 66995.3, quantity: 0.13948, total: 9344.5044 },
      { price: 66995.2, quantity: 0.001005, total: 67.3302 },
      { price: 66995.1, quantity: 0.06578, total: 4406.9377 },
      { price: 66994.7, quantity: 0.001039, total: 69.6075 },
      { price: 66994.3, quantity: 0.072578, total: 4862.3123 },
      { price: 66994.1, quantity: 0.11, total: 7369.351 },
      { price: 66994.0, quantity: 1.76903, total: 118514.3958 },
    ],
  };

  const tabs = [
    { name: "Order book", content: "" },
    {
      name: "Market trades",
      content: "",
    },
  ];

  return (
    <div className="h-auto mg:h-[12.5rem] bg-white border rounded-2xl border-primary50">
      <div className="flex items-center justify-between px-3 pt-[10px] border-b">
        <div className="flex space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.name)}
              className={`relative pb-3 px-1 ${
                activeTab === tab.name ? "text-textBlack font-semibold" : "text-gray-500"
              } text-sm`}
            >
              {tab.name}
              {activeTab === tab.name && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black" />}
            </button>
          ))}
        </div>
        <span>
          <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.839844 3.89065H3.93384C4.09924 4.53574 4.47459 5.10745 5.00072 5.51571C5.52686 5.92397 6.17389 6.14556 6.83984 6.14556C7.5058 6.14556 8.15282 5.92397 8.67896 5.51571C9.2051 5.10745 9.58044 4.53574 9.74584 3.89065H17.3398C17.5388 3.89065 17.7295 3.81163 17.8702 3.67098C18.0108 3.53033 18.0898 3.33956 18.0898 3.14065C18.0898 2.94174 18.0108 2.75097 17.8702 2.61032C17.7295 2.46967 17.5388 2.39065 17.3398 2.39065H9.74584C9.58044 1.74556 9.2051 1.17384 8.67896 0.765586C8.15282 0.357329 7.5058 0.135742 6.83984 0.135742C6.17389 0.135742 5.52686 0.357329 5.00072 0.765586C4.47459 1.17384 4.09924 1.74556 3.93384 2.39065H0.839844C0.640931 2.39065 0.450166 2.46967 0.309514 2.61032C0.168861 2.75097 0.0898438 2.94174 0.0898438 3.14065C0.0898438 3.33956 0.168861 3.53033 0.309514 3.67098C0.450166 3.81163 0.640931 3.89065 0.839844 3.89065ZM6.83984 1.64065C7.23767 1.64065 7.6192 1.79868 7.9005 2.07999C8.18181 2.36129 8.33984 2.74282 8.33984 3.14065C8.33984 3.53847 8.18181 3.92 7.9005 4.20131C7.6192 4.48261 7.23767 4.64065 6.83984 4.64065C6.44202 4.64065 6.06049 4.48261 5.77918 4.20131C5.49788 3.92 5.33984 3.53847 5.33984 3.14065C5.33984 2.74282 5.49788 2.36129 5.77918 2.07999C6.06049 1.79868 6.44202 1.64065 6.83984 1.64065ZM17.3398 11.3906H15.7458C15.5804 10.7456 15.2051 10.1738 14.679 9.76559C14.1528 9.35733 13.5058 9.13574 12.8398 9.13574C12.1739 9.13574 11.5269 9.35733 11.0007 9.76559C10.4746 10.1738 10.0992 10.7456 9.93384 11.3906H0.839844C0.640931 11.3906 0.450166 11.4697 0.309514 11.6103C0.168861 11.751 0.0898438 11.9417 0.0898438 12.1406C0.0898438 12.3396 0.168861 12.5303 0.309514 12.671C0.450166 12.8116 0.640931 12.8906 0.839844 12.8906H9.93384C10.0992 13.5357 10.4746 14.1075 11.0007 14.5157C11.5269 14.924 12.1739 15.1456 12.8398 15.1456C13.5058 15.1456 14.1528 14.924 14.679 14.5157C15.2051 14.1075 15.5804 13.5357 15.7458 12.8906H17.3398C17.5388 12.8906 17.7295 12.8116 17.8702 12.671C18.0108 12.5303 18.0898 12.3396 18.0898 12.1406C18.0898 11.9417 18.0108 11.751 17.8702 11.6103C17.7295 11.4697 17.5388 11.3906 17.3398 11.3906ZM12.8398 13.6406C12.442 13.6406 12.0605 13.4826 11.7792 13.2013C11.4979 12.92 11.3398 12.5385 11.3398 12.1406C11.3398 11.7428 11.4979 11.3613 11.7792 11.08C12.0605 10.7987 12.442 10.6406 12.8398 10.6406C13.2377 10.6406 13.6192 10.7987 13.9005 11.08C14.1818 11.3613 14.3398 11.7428 14.3398 12.1406C14.3398 12.5385 14.1818 12.92 13.9005 13.2013C13.6192 13.4826 13.2377 13.6406 12.8398 13.6406Z"
              fill="#4D4D4D"
            />
          </svg>
        </span>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-3 px-3 py-2 text-xs text-gray-500">
        <div>Price (USDT)</div>
        <div className="text-right">Quantity (BTC)</div>
        <div className="text-right">Total</div>
      </div>

      {/* Order Book Content */}
      <div className="h-[600px] overflow-auto">
        {/* Sell Orders */}
        <div className="px-3">
          {orders.sells.map((order, index) => (
            <div key={`sell-${index}`} className="grid grid-cols-3 text-xs py-0.5">
              <div className="text-alert">{order.price.toFixed(2)}</div>
              <div className="text-right">{order.quantity.toFixed(6)}</div>
              <div className="relative text-right">
                <div
                  className="absolute top-0 bottom-0 right-0 z-0 bg-red-50"
                  style={{
                    width: `${(order.total / 369810.0309) * 100}%`,
                    maxWidth: "100%",
                  }}
                />
                <span className="relative z-10">{order.total.toFixed(4)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Current Price */}
        <div className="flex items-center justify-between px-3">
          <div className="text-xl font-semibold">{orders.currentPrice.toFixed(2)}</div>
          <div className="text-sm text-gray-500">≈ $ {orders.currentPrice.toFixed(2)}</div>
        </div>

        {/* Buy Orders */}
        <div className="px-3">
          {orders.buys.map((order, index) => (
            <div key={`buy-${index}`} className="grid grid-cols-3 text-xs py-0.5">
              <div className="text-success">{order.price.toFixed(2)}</div>
              <div className="text-right">{order.quantity.toFixed(6)}</div>
              <div className="relative text-right">
                <div
                  className="absolute top-0 bottom-0 right-0 z-0 bg-successLight"
                  style={{
                    width: `${(order.total / 118514.3958) * 100}%`,
                    maxWidth: "100%",
                  }}
                />
                <span className="relative z-10">{order.total.toFixed(4)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderBook;
