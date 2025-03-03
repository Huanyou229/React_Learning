import UserProfile from "./UserProfile";
import { UserContext } from "../context/UserContext";
const UserPage = () => {
  const user = { name: "张三" };
  return (
    <UserContext.Provider value={user}>
      <UserProfile />
    </UserContext.Provider>
  );
};
export default UserPage;
