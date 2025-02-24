import "./style.css";
import PropTypes from "prop-types";
const MyCard = ({ image, name, pref }) => {
  return (
    <div className="card">
      <img className="image" src={image} alt={name} />
      <div className="content">
        <img className="avatar" src={image} alt={name} />
        <div className="message">
          <h3 className="title">{name}</h3>
          <p className="pref">{pref}</p>
        </div>
      </div>
    </div>
  );
};

MyCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  pref: PropTypes.string.isRequired,
};
export default MyCard;
