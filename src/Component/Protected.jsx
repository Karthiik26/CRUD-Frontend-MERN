import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';

function Protected(props) {
  const { Component } = props;
  let navigate = useNavigate();

  let Data = localStorage.getItem("Login");

  function usingLocal() {
    if (!Data && window.location.pathname !== "/Login") {
        Swal.fire({
          title: 'Login  To Acces',
          text: 'Login if You are Existing User OtherWise Signup',
          icon: "",
          timer: 2700,
          timerProgressBar: true,
          // toast: true,
          position: 'center',
          showConfirmButton: false
      });
        navigate("/Login");
      }
      console.log("out");
  }

  useEffect(() => {
    usingLocal();
  }, []);

  return (
    <div>
      <Component />
    </div>
  );
}

export default Protected;
