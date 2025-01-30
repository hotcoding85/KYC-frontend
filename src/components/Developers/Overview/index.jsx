import React from "react";
import LineChart from "./LineChart";
import TimeFilter from "./TimeFilter";

const Overview = () => {
  return (
    <div className="p-4 bg-white shadow-md rounded-xl">
      <div className="flex justify-between mb-4">
        <h2 className="my-auto text-base font-semibold">Your integration</h2>
        <TimeFilter />
      </div>
      <hr />

      {/* API Requests and API Error Distribution */}
      <div className="grid grid-cols-1 gap-6 mt-4 mb-8 md:grid-cols-2">
        <div>
          <h3 className="mb-2 ml-6 text-xs font-semibold">API requests</h3>
          <div className="flex gap-12 mb-2">
            <div className="ml-6">
              <p className="text-xs">Successful</p>
              <p className="text-lg font-semibold">0</p>
            </div>
            <div>
              <p className="text-xs">Failed</p>
              <p className="text-lg font-semibold">0</p>
            </div>
          </div>
          <LineChart />
        </div>

        <div>
          <h3 className="mb-2 ml-6 text-xs font-semibold">
            API error distribution
          </h3>
          <div className="flex gap-12 mb-2">
            <div className="ml-6">
              <p className="text-xs">GET</p>
              <p className="text-lg font-semibold">0</p>
            </div>
            <div>
              <p className="text-xs">POST</p>
              <p className="text-lg font-semibold">0</p>
            </div>
            <div>
              <p className="text-xs">DELETE</p>
              <p className="text-lg font-semibold">0</p>
            </div>
          </div>
          <LineChart />
        </div>
      </div>

      {/* Webhooks and Webhooks Response Time */}
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
        <div>
          <h3 className="mb-2 ml-6 text-xs font-semibold">Webhooks</h3>
          <div className="flex gap-12 mb-2">
            <div className="ml-6">
              <p className="text-xs">Successful</p>
              <p className="text-lg font-semibold">0</p>
            </div>
            <div>
              <p className="text-xs">Failed</p>
              <p className="text-lg font-semibold">0</p>
            </div>
          </div>
          <LineChart />
        </div>

        <div>
          <h3 className="mb-2 ml-6 text-xs font-semibold">
            Webhooks response time
          </h3>
          <div className="flex gap-12 mb-2">
            <div className="ml-6">
              <p className="text-xs">GET</p>
              <p className="text-lg font-semibold">0</p>
            </div>
            <div>
              <p className="text-xs">POST</p>
              <p className="text-lg font-semibold">0</p>
            </div>
            <div>
              <p className="text-xs">DELETE</p>
              <p className="text-lg font-semibold">0</p>
            </div>
          </div>
          <LineChart />
        </div>
      </div>

      {/* API Version */}
      <div>
        <div className="flex justify-between">
          <h3 className="mb-2 text-sm font-medium">API Version</h3>
          <p className="text-textSecondary font-semibold text-sm">
            Upgrade available...
          </p>
        </div>
        <ul className="space-y-2">
          <li className="flex items-center justify-between p-2 border-t ">
            <div className="flex gap-2 mt-1">
              <span className="mt-1 text-sm">2024-10-28</span>
              <span className="px-2 py-1 mt-0.5 text-xs text-white bg-black rounded">
                Latest
              </span>
            </div>
            <p>------------</p>
          </li>
          <li className="flex items-center justify-between p-2 border-t border-b ">
            <div className="flex gap-2 mt-1">
              <span className="mt-1 text-sm">2020-08-27</span>
              <span className="px-2 py-1  mt-0.5 text-xs text-gray-700 bg-gray-300 rounded">
                Default
              </span>
            </div>
            <p>------------</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Overview;
