// 类组件
// import WelcomeClass from "./components/WelcomeClass.jsx";
// import CounterClass from "./components/CounterClass.jsx";

// 函数组件
// import WelcomeFunc from "./components/WelcomeFunc.jsx";
// import CounterFunc from "./components/CounterFunc.jsx";
// import Student from "./components/Student.jsx";
// import RandomName from "./components/RandomName.jsx";
// import Header from "./components/Header.jsx";
// import Footer from "./components/Footer.jsx";
// import Main from "./components/Main.jsx";
// import Button from "./components/Button";
// import UserPage from "./components/UserPage";
// import Button1 from "./components/Button1";
// import InputParent from "./components/InputParent";
// import RegistPage from "./components/RegistPage";
// import Card from "./components/solt-card/Card";
// import TaskPage from "./components/TaskPage";

// React中的三种样式
// import Div from "./components/three-style/Div";

// React中的插槽
// import NavBar from "./components/navbar/NavBar";
// import NavBar2 from "./components/navbar/NavBar2;

//图书管理系统
import BookApp from "./components/book/BookApp";

const APP = () => {
  // const handleClick = () => {
  //   alert("插槽按钮被点击了");
  // };
  return (
    <>
      {/* <WelcomeClass name="React" /> */}
      {/* <CounterClass /> */}
      {/* <WelcomeFunc name="React组件！！" /> */}
      {/* <CounterFunc /> */}
      {/* <Student
        name="张三"
        age={18}
        gender="男"
        img="https://public-cdn-oss.mosoteach.cn/avatar/2023/E9/822131f0a1e63a228eb1a2df2b619fe3.jpg?v=1735562479&x-oss-process=style/s300x300"
        pref="南京工业职业技术大学"
      /> */}
      {/* <RandomName /> */}
      {/* <Header />
      <Main />
      <Footer /> */}
      {/* <Button onClick={handleClick} /> */}
      {/* <UserPage  /> */}
      {/* <Button1 onClick={handleClick} /> */}
      {/* <InputParent /> */}
      {/* <RegistPage /> */}
      {/* <TaskPage /> */}
      {/* <Card
        header={<h2>张三丰</h2>}
        body={<p>南京工业职业技术大学</p>}
        footer={<button onClick={handleClick}>操作按钮</button>}
      /> */}

      {/* <Div /> */}
      {/* 1.使⽤children实现插槽 */}
      {/* <NavBar>
        <button>按钮</button>
        <h2>哈哈哈</h2>
        <i>斜体⽂本</i>
      </NavBar> */}

      {/* 2.使⽤props实现插槽 */}
      {/* <NavBar2
        leftSlot={<button>按钮</button>}
        centerSlot={<h2>呵呵呵</h2>}
        rightSlot={<i>斜体2</i>}
      /> */}
      <BookApp />
    </>
  );
};
export default APP;
