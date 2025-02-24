import PropTypes from "prop-types";

const Button1 = ({ onClick }) => {
  return <button onClick={onClick}>click me</button>;
};

Button1.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button1;
