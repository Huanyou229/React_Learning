import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
// import Categories from "@/pages/Categories";
import CategoryNotes from "@/pages/category/CategoryNotes";
// import Notes from "@/pages/Notes";
import NoteDetail from "@/pages/note/NoteDetail";
import CreateNote from "@/pages/note/CreateNote";
import EditNote from "@/pages/note/EditNote";
import AI from "@/pages/AI";
import CategoryHome from "@/pages/category/CategoryHome";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      {/* <Route path="/categories" element={<Categories />} /> */}
      <Route path="/notes/categories/:categoryId" element={<CategoryNotes />} />
      {/* <Route path="/notes" element={<Notes />} /> */}
      <Route path="/notes/:id" element={<NoteDetail />} />
      <Route path="/create-note" element={<CreateNote />} />
      <Route path="/notes/edit/:noteId" element={<EditNote />} />
      <Route path="/ai" element={<AI />} />
      <Route path="/categoryHome" element={<CategoryHome />} />
    </Routes>
  );
};
export default AppRoutes;
