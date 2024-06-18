import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Component/Home";
import Signup from "./Component/Signup";
import Login from "./Component/Login";
import NavBar from "./Component/NavBar";
import Create from "./Component/Create";
import Cart from "./Component/Cart";
import Profile from "./Component/Profile";
import Protected from "./Component/Protected";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route element={<Protected />}>
              <Route path="/" element={<Home />} />
              <Route path="/Create" element={<Create />} />
              <Route path="/Cart" element={<Cart />} />
              <Route path="/Profile" element={<Profile />} />
            </Route>
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
