import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';
 import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function Protected() {
  let Data = localStorage.getItem("Login");
  return (
    <div>
      {Data ?<Outlet/>:<Navigate to='/login' />}
    </div>
  )
}

