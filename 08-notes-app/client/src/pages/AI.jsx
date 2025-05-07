import React from "react";

import Sidebar from "@/components/Sidebar";
const AI = () => {
  return (
    <div>
      <div className="flex flex-row h-screen">
        <Sidebar />
        <div className="flex-1 p-4">AI写作</div>
      </div>
    </div>
  );
};

export default AI;
