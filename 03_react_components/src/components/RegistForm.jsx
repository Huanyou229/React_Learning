import { useState } from "react";
import PropTypes from "prop-types";

const RegistForm = ({ onLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ name, email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>用户注册</h2>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Email :
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">提交</button>
    </form>
  );
};

RegistForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default RegistForm; // 确保有默认导出
