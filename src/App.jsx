import './App.css';
import React from 'react';
import SignUp from './pages/sign_up';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<SignUp />} />
      </>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App

// Set home route to be Register
// UI 
// Form validation beforehand