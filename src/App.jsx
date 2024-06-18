import "./App.css";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Navbar />
          <div className="bg-gradient-to-br from-amber-50 to-amber-400">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
