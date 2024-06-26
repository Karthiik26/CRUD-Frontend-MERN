import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';
import img from "../images/png.png"

function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const nav = useNavigate();

  async function LoggedIn(event) {
    try{ event.preventDefault();
      let result = await fetch(
        `https://crud-mern-backend-66eu.onrender.com/login/${Email}/${Password}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await result.json();
      console.log(data);
  
      if (result.ok) {
        localStorage.setItem("Login", JSON.stringify(data));
        Swal.fire({
          title: 'Loggin Successfullyyy',
          text: 'Explore More',
          icon: "success",
          timer: 2800,
          timerProgressBar: true,
          // toast: true,
          position: 'center',
          showConfirmButton: false
      });
        setTimeout(() => {
          nav("/");
          window.location.reload();
        }, 2800);
      } else {
        Swal.fire({
          title: 'Loggin failed',
          text: 'Please try again',
          icon: 'error',
          timer: 2800,
          timerProgressBar: true,
          // toast: true,
          position: 'center',
          showConfirmButton: false
      });
        setTimeout(() => {
          nav("/");
          window.location.reload();
        }, 2800);
      }}catch(error){ Swal.fire({
        title: 'User not found',
        text: 'Please try again',
        icon: 'error',
        timer: 2800,
        timerProgressBar: true,
        // toast: true,
        position: 'center',
        showConfirmButton: false
    });
      setTimeout(() => {
        nav("/");
        window.location.reload();
      }, 2800);}
   
  }

  return (
    <>
      <div className="flex justify-center mx-32 p-0 rounded">
        <div className="text-center py-3">
          <span className="text-[42px] dark:text-white font-serif text-black px- mb-0">
            Login
          </span>
          <div className="px-3 dark:text-yellow-300 text-[22px] text-pink-600 mt-0 font-medium">
            Login To Explore More
          </div>

          <form onSubmit={LoggedIn}>
            <div className="flex justify-center m-2">
              <img
                className="w-1/3 h-4/6 dark:text-black"
                src={img}
                alt="img not found"
              />
              <div className="flex justify-center m-2 flex-col">
                <label className="text-gray-800 dark:text-white text-[18px] text-left ml-3 mt-5">
                  Enter Your Email
                </label>
                <input
                  type="text"
                  name="Email"
                  id="Email"
                  value={Email}
                  className="p-4 m-4 border font-medium dark:text-black border-b-black text-[18px] rounded w-80"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <label className="text-gray-800 dark:text-white text-[18px] text-left ml-3 mt-5">
                  Enter Your Password
                </label>
                <input
                  type="password"
                  name="Password"
                  id="Password"
                  value={Password}
                  className="p-4 m-4 border dark:text-black font-medium border-b-black text-[18px] rounded w-80"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <button
                  className="p-3 bg-red-800 text-white text-[18px] font-medium m-5 w-32 rounded-full"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
