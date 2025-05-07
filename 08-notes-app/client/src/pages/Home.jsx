// Home.jsx
import React from "react";
import Sidebar from "@/components/Sidebar";

const Home = () => {
  return (
    <div className="flex flex-row h-screen">
      <Sidebar />
      <div className="flex-1 p-4">开始</div>
    </div>
  );
};

export default Home;
