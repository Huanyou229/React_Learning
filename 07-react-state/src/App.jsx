import React from "react";
import CounterUseState from "./components/CounterUseState";
import Profile from "./components/Profile";
import TodoList from "./components/TodoList";
import UserProvider from "./components/UserProvider";
import UserProfile from "./components/UserProfile";
import UpdateUser from "./components/UpdateUser";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "./store/actions";
import CounterZustand from "./components/CounterZustand";
const App = () => {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();
  return (
    <>
      {/* <CounterUseState />
      <Profile />
      <TodoList />
      <UserProvider>
        <UserProfile />
        <UpdateUser />
      </UserProvider> */}
      <div>
        <h1>计数器: {count}</h1>
        <button onClick={() => dispatch(increment())}>增加</button>
        <button onClick={() => dispatch(decrement())}>减少</button>
      </div>
      <CounterZustand />
    </>
  );
};

export default App;
