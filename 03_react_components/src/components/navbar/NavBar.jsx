import "./style.css";
// eslint-disable-next-line react/prop-types
const NavBar = ({ children }) => {
  console.log(children);
  return (
    <div className="nav-bar">
      <div className="left">{children[0]}</div>
      <div className="center">{children[1]}</div>
      <div className="right">{children[2]}</div>
    </div>
  );
};
export default NavBar;
