import PropTypes from "prop-types";
const Student = ({ name, img, age, gender, pref }) => {
  return (
    <div>
      <h1>姓名：{name}</h1>
      <img src={img} alt={name} />
      <p>年龄: {age}</p>
      <p>性别: {gender}</p>
      <p>学校: {pref}</p>
    </div>
  );
};
Student.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  gender: PropTypes.string.isRequired,
  pref: PropTypes.string.isRequired,
};

export default Student;
