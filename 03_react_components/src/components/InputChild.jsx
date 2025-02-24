import PropTypes from "prop-types";

const InputChild = ({ onInputChange }) => {
  return (
    <input
      type="text"
      onChange={(e) => onInputChange(e.target.value)}
      placeholder="请输入..."
    />
  );
};
InputChild.propTypes = {
  onInputChange: PropTypes.func.isRequired,
};
export default InputChild;
