// import WelcomeClass from "./components/WelcomeClass.jsx";
// import WelcomeFunc from "./components/WelcomeFunc.jsx";
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
import Card from "./components/card/Card";
const APP = () => {
  const handleClick = () => {
    alert("插槽按钮被点击了");
  };
  return (
    <>
      {/* <WelcomeClass name="React" />
      <WelcomeFunc name="React组件！！" /> */}
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
      <Card
        header={<h2>张三丰</h2>}
        body={<p>南京工业职业技术大学</p>}
        footer={<button onClick={handleClick}>操作按钮</button>}
      />
    </>
  );
};
export default APP;
