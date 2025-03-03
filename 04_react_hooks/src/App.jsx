import React from "react";
import ThemeToggle from "./components/ThemeToggle";
import TextInput from "./components/TextInput";
import TodoList from "./components/TodoList";
import FetchData from "./components/FetchData";
import PageTitle from "./components/PageTitle";
import Time from "./components/Time";
import Weather from "./components/Weather";
import { UserProvider } from "./components/UserProvider";
import Login from "./components/Login";
import Counter from "./components/Counter";
import Form from "./components/Form";
import ThemeProvider from "./components/ThemeProvider";
import ThemeButton from "./components/ThemeButton";
import UserPage from "./components/UserPage";
import ExpensiveCalculationParent from "./components/ExpensiveCalculationParent";
import ListFilterParent from "./components/ListFilterParent";
import Parent from "./components/Parent";
import ExpensiveComponentParent from "./components/ExpensiveComponentParent";
import FocusInput from "./components/FocusInput";
import PreviousValue from "./components/PreviousValue";
import Parent1 from "./components/Parent1";
import Parent2 from "./components/Parent2";
import ComponentSize from "./components/ComponentSize";
import AnimateBox from "./components/AnimateBox";
import APP from "./components/useCustomHook";
import APP1 from "./components/useApi";
import Data from "./components/Data";
import Search from "./components/Search";
const App = () => {
  const handleSearch = (query) => {
    console.log("Searching for:", query);
  };

  return (
    <>
      {/* <ThemeToggle /> */}
      {/* <TextInput /> */}
      {/* <TodoList /> */}
      {/* <FetchData /> */}
      {/* <PageTitle /> */}
      {/* <Time /> */}
      {/* <Weather /> */}
      {/* <UserProvider>
        <Login />
      </UserProvider> */}
      {/* <Counter /> */}
      {/* <Form /> */}
      {/* <ThemeProvider>
        <ThemeButton />
      </ThemeProvider> */}
      {/* <UserPage /> */}
      {/* <ExpensiveCalculationParent /> */}
      {/* <ListFilterParent /> */}
      {/* <Parent /> */}
      {/* <ExpensiveComponentParent /> */}
      {/* <FocusInput /> */}
      {/* <PreviousValue /> */}
      {/* <Parent1 /> */}
      {/* <Parent2 /> */}
      {/* <ComponentSize /> */}
      {/* <AnimateBox /> */}
      {/* <APP /> */}
      {/* <APP1 /> */}
      {/* <Data /> */}
      <h1>Search Example</h1>
      <Search onSearch={handleSearch} />
    </>
  );
};

export default App;
