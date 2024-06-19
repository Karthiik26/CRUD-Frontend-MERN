import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import "../App.css";
import Togglebtn from "./Togglebtn";

export default function NavBar() {
  const [Nav, setNav] = useState();

  const nav = useNavigate();

  useEffect(() => {
    let localdata = localStorage.getItem("Login");
    if (localdata) {
      setNav(true);
      nav("/");
    } else {
      setNav(false);
      nav("/Login");
    }
  }, []);

  const [Dark, setDark] = useState();

  function ToggleDarkmode() {
    const x = localStorage.getItem("darkMode");
    setDark(x);
    if (Dark === "true") {
    }
    console.log("--------" + Dark);
  }

  function LogOut() {
    localStorage.clear("Login");
    window.location.reload();
    nav("/Login");
  }

  return (
    <>
      {Nav ? (
        <div>
          {/* <div className="flex justify-end text-zinc-950 bg-red-100 ">
            <h5 className="px-6 m-1 text-[16px] font-medium">Karthik Nagula</h5>
          </div> */}
          <div className="flex justify-between">
            <div className="mx-4 py-4 my-1 text-[24px] font-bold">
              WEB OPERATIONS
            </div>
            <div className="py-4 mx-2">
              <span className="px-4 py-2" onClick={() => ToggleDarkmode()}>
                <Togglebtn />
              </span>
              <NavLink
                className="px-4 py-2 font-semibold text-[18px] home"
                to={"/"}
              >
                Home
              </NavLink>
              <NavLink
                className="px-4 py-2 font-semibold text-[18px] home"
                to={"/Create"}
              >
                Create
              </NavLink>
              <NavLink
                className="px-4 py-2 font-semibold text-[18px] home"
                to={"/Cart"}
              >
                Cart
              </NavLink>
              <NavLink
                className="px-4 py-2 font-semibold text-[18px] home"
                to={"/Profile"}
              >
                Profile
              </NavLink>

              <NavLink
                className="px-4 py-3 mx-2 text-[18px] border-none text-red-700 font-serif bg-orange-100 rounded  font-medium logout"
                onClick={LogOut}
              >
                LogOut
              </NavLink>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-between m-auto bg-white my-0 dark:bg-gray-500 dark:text-white " >
          <div className="py-4 mx-2 flex justify-end">
            <NavLink
              className="px-4 py-2 text-[18px] rounded-full border-2 border-black m-4 nav1"
              to={"/Login"}
            >
              Login
            </NavLink>
            <NavLink
              className="px-4 py-2 text-[18px] rounded-full border-2 border-black m-4 nav1"
              to={"/Signup"}
            >
              SignUp
            </NavLink>
          </div>
          <div className="px-6 py-2 my-5">
            <span className="px-4 py-2" onClick={() => ToggleDarkmode()}>
              <Togglebtn />
            </span>
          </div>
        </div>
      )}
    </>
  );
}
