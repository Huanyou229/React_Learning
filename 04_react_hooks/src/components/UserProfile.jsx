import { useContext } from "react";
import { UserContext } from "../context/UserContext";
const UserProfile = () => {
  const user = useContext(UserContext);
  return <div>欢迎你, {user.name}!</div>;
};
export default UserProfile;
