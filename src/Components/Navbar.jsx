import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../App.css"

export default function Navbar() {
  const [Nav, setNav] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("Login")) {
      setNav(true);
    } else {
      setNav(false);
    }
  }, [Nav]);

  return (
    <>
      <div>
        {Nav ? (
          <div className="flex justify-between m-auto  p-6 bg-white">
            <div>
              <span className="text-[18px] px-4">NavBar</span>
            </div>
            <div>
              <NavLink
                className="p-2 m-5 text-blue-700 text-balance text-[18px] hover:bg-blue-300"
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                className="p-2 m-5 text-blue-700 text-balance text-[18px] hover:bg-blue-300"
                to="/"
              >
                CREATE
              </NavLink>
              <NavLink
                className="p-2 m-5 text-blue-700 text-balance text-[18px] hover:bg-blue-300"
                to="/"
              >
                CART
              </NavLink>
              <NavLink
                className="p-2 m-5 text-blue-700 text-balance text-[18px] hover:bg-blue-300" 
                to="/"
              >
                LOGOUT
              </NavLink>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}
