import PropTypes from "prop-types";
import "../css/ShortcutBlock.css";

const ShortcutBlock = ({ name, url, icon }) => {
  return (
    <div className="shortcut-container">
      <a href={url} target="_blank" className="shortcut-block">
        <img src={icon} alt={name} className="shortcut-icon" />
      </a>
      <div className="shortcut-name">{name}</div>
    </div>
  );
};

ShortcutBlock.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default ShortcutBlock;
