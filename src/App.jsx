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
            <Route path="/" element={<Protected Component={Home} />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Create" element={<Protected Component={Create} />}/>
            <Route path="/Cart" element={<Protected Component={Cart} />}/>
            <Route path="/Profile" element={<Protected Component={Profile} />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
