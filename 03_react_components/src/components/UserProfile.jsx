import PropTypes from "prop-types";
const UserProfile = ({ name, age, onAgeChange }) => {
  return (
    <div>
      <h2>User Profile</h2>
      <p>name :{name}</p>
      <p>age :{age}</p>
      <button onClick={onAgeChange}>增加年龄</button>
    </div>
  );
};
UserProfile.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  onAgeChange: PropTypes.func.isRequired,
};
export default UserProfile;
