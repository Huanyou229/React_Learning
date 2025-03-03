import { useState } from "react";

const TextInput = () => {
  const [InputValue, setInputValue] = useState("abc");
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <input type="text" value={InputValue} onChange={handleChange} />

      <div>当前输入的内容：{InputValue}</div>
    </div>
  );
};

export default TextInput;
