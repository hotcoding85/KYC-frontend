import React from "react";
import LogCards from "./LogCards";
import LogTable from "./LogTable";

const Logs = () => {
  return (
    <div className="flex flex-col gap-4">
      <LogCards />
      <LogTable />
    </div>
  );
};

export default Logs;
