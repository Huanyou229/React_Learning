// src/AppRoutes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import Dashboard from "../pages/dashboard/Dashboard";
import Profile from "../pages/dashboard/profile/Profile";
import Setting from "../pages/dashboard/Setting";
import Fans from "../pages/dashboard/profile/Fans";
import Follow from "../pages/dashboard/profile/Follow";
import Login from "../pages/Login";
import Book from "../pages/Book";
import BlogDetails from "../components/BlogDetails";
import Layout from "../components/Layout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* 登录页面，不包含导航栏 */}
      <Route path="/login" element={<Login />} />

      {/* 使用 Layout 组件包含导航栏和其他页面 */}
      <Route path="/*" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<Profile />} />
          <Route path="profile" element={<Profile />}>
            <Route index element={<Fans />} />
            <Route path="fans" element={<Fans />} />
            <Route path="follow" element={<Follow />} />
          </Route>
          <Route path="setting" element={<Setting />} />
        </Route>
        <Route path="book/:bookId" element={<Book />} />
        <Route path="blog/:id" element={<BlogDetails />} />
      </Route>

      {/* 404 页面 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
