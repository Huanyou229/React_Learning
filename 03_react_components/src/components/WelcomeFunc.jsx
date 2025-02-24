import PropTypes from "prop-types";
const WelcomeFunc = (props) => {
  return <h1>Hello, {props.name}!</h1>;
};
WelcomeFunc.propTypes = {
  name: PropTypes.string.isRequired,
};
export default WelcomeFunc;
