import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';
import img from "../images/Uploadpana.png"

function Signup() {
  const nav = useNavigate();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Country, setCountry] = useState("");
  const [Name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Displaying Image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  // Delete Image In Signup
  function deleteImage() {
    setSelectedFile(null);
    setSelectedImage(null);
  }

  // Call SignUp Api
  async function SignUp(e) {
    e.preventDefault();
    if (!Name) {
      console.log("Name");
    } else if (!Email) {
      console.log("Email");
    } else if (!Password) {
      console.log("Password");
    } else if (!Country) {
      console.log("Country");
    } else if (!selectedFile) {
      console.log("Image");
    } else {
      try {
        const formData = new FormData();

        formData.append("Name", Name);
        formData.append("Email", Email);
        formData.append("Password", Password);
        formData.append("Country", Country);
        formData.append("UserImage", selectedFile);

        console.log("formData: ", formData);

        const response = await fetch("https://crud-mern-backend-66eu.onrender.com/UserSignUp", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        console.log("Response: ", data);

        if (response.ok) {
          localStorage.setItem("Login", JSON.stringify(data));
          Swal.fire({
            title: 'SignUp Successfullyyy',
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
              title: 'SignUp Failed',
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

      } catch (error) {
        Swal.fire({
          title: 'Signup failed',
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
  }

  return (
    <>
      <div className="flex justify-center mx-48 mt-5 px-4 py-0 border-2 w-50 rounded-2xl">
        <div className="text-center">
          <div className="text-center">
            <div className="text-[32px] font-serif font-extrabold m-0 pt-4">
              Signup
            </div>
            <div className="text-[20px] dark:text-green-300 font-medium text-blue-600 font-sans m-0">
              Signup to explore more
            </div>
          </div>
          <form className="w-92" onSubmit={SignUp}>
            <div className="flex justify-center align-middle m-0">
              <img className="w-2/5" src={img} alt="" />
              <div className="flex justify-center m-auto flex-col">
                <div className="flex justify-between m-auto flex-row">
                  <span className="flex justify-start m-auto flex-col">
                    <input
                      type="file"
                      name="UserImage"
                      id="file"
                      onChange={handleImageChange}
                      className="p-4 m-4 border border-b-black text-[18px] rounded w-80 font-medium"
                    />
                  </span>
                  {selectedImage && (
                    <span className="flex justify-center m-auto flex-col">
                      <div className="flex justify-center align-middle flex-row p-4 mx-4 w-80">
                        <div className="img-preview-profile w-28 h-28 rounded-full border-4">
                          <img
                            src={selectedImage}
                            className="w-28 h-30 dark:text-blackfont-medium"
                            alt="" 
                          />
                        </div>
                        <div className="mt-12 ml-5">
                          <button
                            type="button"
                            onClick={deleteImage}
                            className="bg-red-500 text-white font-medium p-2 m-1 rounded"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </span>
                  )}
                </div>
                <div className="flex justify-center m-auto flex-row">
                  <span className="flex justify-center m-auto flex-col">
                    <label className="text-gray-800 dark:text-white text-[18px] text-left ml-3 mt-5">
                      Enter Your Name
                    </label>
                    <input
                      type="text"
                      name="Name"
                      id="Name"
                      className="p-2 m-3 border font-medium dark:text-black border-b-black text-[18px] rounded w-80"
                      value={Name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </span>

                  <span className="flex justify-center m-auto flex-col">
                    <label className="text-gray-800 dark:text-white text-[18px] text-left ml-3 mt-5">
                      Enter Your Email
                    </label>
                    <input
                      type="email"
                      name="Email"
                      id="Email"
                      className="p-2 m-3 border dark:text-black font-medium border-b-black text-[18px] rounded w-80"
                      value={Email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </span>
                </div>
                <div className="flex justify-center m-auto flex-row">
                  <span className="flex justify-center m-auto flex-col">
                    <label className="text-gray-800 dark:text-white text-[18px] text-left ml-3 mt-5">
                      Enter Your Country Name
                    </label>
                    <input
                      type="text"
                      name="Country"
                      id="country"
                      className="p-2 m-3 border dark:text-black font-medium border-b-black text-[18px] rounded w-80"
                      value={Country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </span>

                  <span className="flex justify-center m-auto flex-col">
                    <label className="text-gray-800 dark:text-white text-[18px] text-left ml-3 mt-5">
                      Enter Your Password
                    </label>
                    <input
                      type="password"
                      name="Password"
                      id="password"
                      className="p-2 m-3 border dark:text-black font-medium border-b-black text-[18px] rounded w-80"
                      value={Password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </span>
                </div>
                <button
                  className="p-3 bg-orange-500 text-[18px] font-medium m-5 w-32 rounded-full"
                  type="submit"
                >
                  SignUp
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
