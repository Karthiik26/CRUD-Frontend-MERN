import { useEffect, useState } from "react";
import "../App.css";
import Footer from "./Footer";
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';
import img from "../images/Innovation.png";

export default function Create() {

  const [Title, SetTitle] = useState("");
  const [description, Setdescription] = useState("");
  const [image, SetImage] = useState("");
  const [UserId, setUserId] = useState("");

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("Login"));
    console.log(data._id);
    setUserId(data._id);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      SetImage(file);
    }
  };

  async function AddToTheCart(e) {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("Title", Title);
      formData.append("description", description);
      formData.append("ProductImage", image);

      console.log("formData: ", formData);

      const resp = await fetch(
        `https://crud-mern-backend-66eu.onrender.com/ProductInserting/${UserId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await resp.json();
      console.log(data);

      if (resp.ok) {
        console.log("response"+data);
        Swal.fire({
          title: "CREATED ONE ITEM ADDED",
          text: "CRUD -> CREATE",
          icon: "success",
          timerProgressBar: false,
          position: "center",
          showConfirmButton: true,
        });
      } else {
        console.log("Error");
        Swal.fire({
          title: "ERROR",
          text: "CRUD -> CREATE",
          icon: "error",
          timerProgressBar: false,
          position: "center",
          showConfirmButton: true,
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
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
    }
  }

  return (
    <>
      <div>
        <div className="flex justify-start align-middle flex-row ml-36 mt-8">
          <h1
            className="font-bold text-[28px] font-sans"
            style={{ letterSpacing: "2px" }}
          >
            ADD YOUR PRODUCT
          </h1>
        </div>

        <div className="mx-24">
          <form onSubmit={AddToTheCart}>
            <div className="flex justify-evently flex-row px-6 py-6 ">
              <span className="flex justify-between align-middle mt-6 flex-col label-area">
                <label className="text-[20px] font-sans font-medium px-6 label0">
                  Image :
                </label>
                <label className="text-[20px] font-sans font-medium px-6 label1">
                  Title :
                </label>
                <label className="text-[20px] font-sans font-medium px-6 label2">
                  Description :
                </label>
              </span>
              <span className="flex justify-center align-middle flex-col">
                <input
                  className="text-[18px] font-sans font-medium my-6 p-3 border-2 border-slate-600 rounded"
                  type="file"
                  name="ProductImage"
                  id="ProductImage"
                  onChange={handleImageChange}
                  placeholder="Title....? ex. MyGroceries, ItemsList-1 etc"
                />
                <input
                  className="text-[18px] font-sans font-medium my-6 p-3 border-2 border-slate-600 rounded"
                  type="text"
                  name="Title"
                  id="Title"
                  value={Title}
                  onChange={(e) => SetTitle(e.target.value)}
                  placeholder="Title....? ex. MyGroceries, ItemsList-1 etc"
                />
                <textarea
                  className="text-[18px] font-sans font-medium my-6 p-3 border-2 border-slate-600 rounded"
                  id="description"
                  name="description"
                  rows="4"
                  cols="50"
                  value={description}
                  onChange={(e) => Setdescription(e.target.value)}
                  placeholder="Make List Of Your Groceries...."
                ></textarea>
              </span>
            </div>
            <span
              className="flex justify-center align-middle flex-row"
              style={{ marginLeft: "-220px" }}
            >
              <button
                type="submit"
                className="text-[16px] font-sans font-bold bg-green-600 px-4 py-2 rounded text-white hover:bg-green-400"
              >
                CREATE
              </button>
            </span>
          </form>
        </div>

        <div className="image-innovation opacity-75">
          {/* <img className="" src={img} alt="" /> */}
          <img src={img} alt="" />
        </div>
      </div>
      <Footer />
    </>
  );
}
