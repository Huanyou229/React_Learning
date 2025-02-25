import PropTypes from "prop-types";
import "./Card.css"; 

const Card = ({ header, body, footer }) => {
  return (
    <div className="card">
      <div className="card-header">{header}</div>
      <div className="card-body">{body}</div>
      <div className="card-footer">{footer}</div>
    </div>
  );
};
Card.propTypes = {
  header: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  footer: PropTypes.string.isRequired,
};

export default Card;
