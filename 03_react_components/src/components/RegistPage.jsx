import { useState } from "react";
import RegistForm from "./RegistForm"; // 确保路径正确

const RegistPage = () => {
  const [userData, setUserData] = useState({ name: "", email: "" });

  const handleLogin = (data) => {
    setUserData(data);
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        width: "300px",
        margin: "0 auto",
      }}
    >
      <RegistForm onLogin={handleLogin} />
      <div style={{ marginTop: "20px" }}>
        <h3>提交数据:</h3>
        <p>Name: {userData.name}</p>
        <p>Email: {userData.email}</p>
      </div>
    </div>
  );
};

export default RegistPage; // 确保有默认导出
