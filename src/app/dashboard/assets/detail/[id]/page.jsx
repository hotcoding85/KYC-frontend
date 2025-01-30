"use client"
import React from "react";
import NavBar from "@/components/NavBar/NavBar";
import AssetsDetailsBody from "@/components/Assets/Details/DetailsBody";

export default function AssetsDetailsPage() {

  return (
    <>
      <NavBar pageName={"Asset"} >
        <div className="p-4">
          <AssetsDetailsBody />
        </div>
      </NavBar>
    </>
  );
}

// const AssetsDetails = () => {
//   return (
//     <div className="min-h-screen p-6 bg-gray-50">
//       {/* Navigation Tabs */}
//       <div className="flex mb-6 space-x-8">
//         <button className="text-lg font-semibold text-gray-600">Asset Information</button>
//         <button className="text-lg font-semibold text-gray-600">Liquidity</button>
//         <button className="text-lg font-semibold text-gray-600">Wallets</button>
//         <button className="text-lg font-semibold text-gray-600">Transactions</button>
//         <button className="text-lg font-semibold text-gray-600">Extras</button>
//       </div>

//       {/* Overview, Nodes, Networks, Policies Tabs */}
//       <div className="flex mb-6 space-x-4">
//         <button className="px-4 py-2 text-gray-600 bg-gray-100 rounded">Overview</button>
//         <button className="px-4 py-2 text-gray-600 bg-gray-100 rounded">Nodes</button>
//         <button className="px-4 py-2 text-gray-600 bg-gray-100 rounded">Networks</button>
//         <button className="px-4 py-2 text-gray-600 bg-gray-100 rounded">Policies</button>
//       </div>

//       {/* Main Content Grid */}
//       <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//         {/* Asset Details Card */}
//         <div className="p-6 bg-white rounded-lg shadow-md">
//           <h2 className="mb-4 text-xl font-semibold">Asset Details</h2>
//           <div className="mb-4 text-2xl font-bold text-right">1,200,000 BTC</div>
//           <div className="space-y-2 text-sm text-gray-700">
//             <div className="flex justify-between"><span>Market Cap</span><span>12</span></div>
//             <div className="flex justify-between"><span>Rank</span><span>12</span></div>
//             <div className="flex justify-between"><span>Volume (24)</span><span>xx xxx xxxx</span></div>
//             <div className="flex justify-between"><span>Volume/Market Cap (24h)</span><span>xx xxx xxxx</span></div>
//             <div className="flex justify-between"><span>Circulating Supply</span><span>12</span></div>
//             <div className="flex justify-between"><span>Total Supply</span><span>12</span></div>
//             <div className="flex justify-between"><span>Max Supply</span><span>xx xxx xxxx</span></div>
//             <div className="flex justify-between"><span>Fully diluted market cap</span><span>xx xxx xxxx</span></div>
//           </div>

//           {/* Chart Placeholder */}
//           <div className="mt-6">
//             <div className="flex items-center justify-between mb-2 text-sm">
//               <div className="px-2 py-1 bg-gray-200 rounded">USD</div>
//               <div className="flex space-x-2">
//                 <button className="px-3 py-1 bg-gray-200 rounded">Max</button>
//                 <button className="px-3 py-1 bg-gray-200 rounded">1D</button>
//                 <button className="px-3 py-1 bg-gray-200 rounded">7D</button>
//                 <button className="px-3 py-1 bg-gray-200 rounded">15D</button>
//                 <button className="px-3 py-1 bg-gray-200 rounded">30D</button>
//               </div>
//             </div>
//             <div className="h-24 bg-gray-100 rounded-lg"></div> {/* Placeholder for the graph */}
//           </div>
//         </div>

//         {/* Asset Balance Card */}
//         <div className="p-6 bg-white rounded-lg shadow-md">
//           <h2 className="mb-4 text-xl font-semibold">Asset Balance</h2>
//           <div className="mb-4 text-2xl font-bold text-right">1,200,000 BTC</div>
//           <div className="space-y-2 text-sm text-gray-700">
//             <div className="flex justify-between"><span>Customer Held</span><span>12</span></div>
//             <div className="flex justify-between"><span>Node Wallet</span><span>12</span></div>
//             <div className="flex justify-between"><span>Incoming</span><span>12</span></div>
//             <div className="flex justify-between"><span>Auxiliary Wallet</span><span>12</span></div>
//             <div className="flex justify-between"><span>Outcoming</span><span>xx xxx xxxx</span></div>
//             <div className="flex justify-between"><span>Liquidity Provider</span><span>xx xxx xxxx</span></div>
//             <div className="flex justify-between"><span>Pending</span><span>xx xxx xxxx</span></div>
//             <div className="flex justify-between"><span>Volume (24h)</span><span>xx xxx xxxx</span></div>
//           </div>

//           {/* Chart Placeholder */}
//           <div className="mt-6">
//             <div className="flex items-center justify-between mb-2 text-sm">
//               <div className="px-2 py-1 bg-gray-200 rounded">Holdings by Wallet</div>
//               <div className="flex space-x-2">
//                 <button className="px-3 py-1 bg-gray-200 rounded">Max</button>
//                 <button className="px-3 py-1 bg-gray-200 rounded">1D</button>
//                 <button className="px-3 py-1 bg-gray-200 rounded">7D</button>
//                 <button className="px-3 py-1 bg-gray-200 rounded">15D</button>
//                 <button className="px-3 py-1 bg-gray-200 rounded">30D</button>
//               </div>
//             </div>
//             <div className="h-24 bg-gray-100 rounded-lg"></div> {/* Placeholder for the graph */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AssetsDetails;
