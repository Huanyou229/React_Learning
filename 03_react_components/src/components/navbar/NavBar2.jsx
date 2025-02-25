import "./style.css";
const NavBar2 = ({ leftSlot, centerSlot, rightSlot }) => {
  return (
    <div className="nav-bar">
      <div className="left">{leftSlot}</div>
      <div className="center">{centerSlot}</div>
      <div className="right">{rightSlot}</div>
    </div>
  );
};
export default NavBar2;
