import './App.css';
import React from 'react';
import SignUp from './pages/sign_up';
import SignIn from './pages/sign_in';
import Home from './pages/home';
import User from './pages/user';
import Blogs from './pages/blogs'
import Tasks from './pages/tasks';
import Blog from './pages/one_blog';
import UserUpdate from './pages/one_user';
import UpdateBlog from './blogs/update_blog';
import Task from './pages/one_task';
import UpdateTask from './tasks/update_task';

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Header from './pages/header';


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      
        <Route path="/" element={<SignUp />} />
        <Route path="/sign_in" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/task" element={<Tasks />} />
        <Route path="/one_blog/:id" element={<Blog />} />
        <Route path="/one_user/:id" element={<UserUpdate />} />
        <Route path="/one_task/:id" element={<Task />} />
        <Route path="/blog_update/:id" element={<UpdateBlog />} />
        <Route path="/task_update/:id" element={<UpdateTask />} />
      </>
    )
  );
  return (
    <>
    <Header/>
      <RouterProvider router={router} />
    </>
  )
}

export default App

// Set home route to be Register
// UI 
// Form validation beforehand