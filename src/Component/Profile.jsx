import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import "../App.css";

export default function Profile() {
  const nav = useNavigate();
  const [btn1, Setbtn1] = useState(true);
  const [btn2, Setbtn2] = useState(false);
  const [btn3, Setbtn3] = useState(false);
  const [NewPassword, setNewPassword] = useState("");
  const [Image, setImage] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Country, setCountry] = useState("");
  const [Name, setName] = useState("");
  const [UserId, setUserId] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const [ImageUser, setImageUser] = useState([]);

  // Displaying Image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  // Delete Image
  function deleteImage() {
    setImage(file);
    setSelectedImage(null);
  }

  useEffect(() => {
    console.log("useEffect");
    gettingData();
  }, []);

  function ViewFunc() {
    gettingData();
    Setbtn1(true);
    Setbtn2(false);
    Setbtn3(false);
  }

  // GettingUser
  const gettingData = async () => {
    let data = JSON.parse(localStorage.getItem("Login"));
    if (data) {
      console.log(data._id);
      setUserId(data._id);
      const dataId = data._id;

      try {
        const resp = await fetch(
          `https://crud-mern-backend-66eu.onrender.com/GettingUser/${dataId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const result = await resp.json();
        if (resp.ok) {
          setImageUser(result);
          setName(result.Name);
          setEmail(result.Email);
          setCountry(result.Country);
          const buffer = new Uint8Array(result.UserImage.Data.data);
          const blob = new Blob([buffer], {
            type: result.UserImage.contentType,
          });
          const reader = new FileReader();
          // console.log(base64String);
          reader.onloadend = () => {
            setImage(reader.result);
          };
          reader.readAsDataURL(blob);

          // setImage(imageSrc);
        }
      } catch (error) {
        Swal.fire({
          title: 'failed to fetch user',
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
  };

  function UpdateFunc() {
    gettingData();
    Setbtn1(false);
    Setbtn2(true);
    Setbtn3(false);
  }

  function ChngPassFunc() {
    Setbtn1(false);
    Setbtn2(false);
    Setbtn3(true);
  }

  // Update User
  const UpdateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("Name", Name);
      formData.append("Email", Email);
      formData.append("Country", Country);
      formData.append("UserImage", Image);

      const resp = await fetch(`https://crud-mern-backend-66eu.onrender.com/UpdateUser/${UserId}`, {
        method: "PUT",
        body: formData,
      });

      const data = await resp.json();

      if (resp.ok) {
        console.log(data);
      } else {
        Swal.fire({
          title: 'failed to update user',
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
        title: 'failed to update user',
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
  };

  // Chnage Password
  const ChangePass = async () => {
    console.log(Password);
    console.log(NewPassword);
    const data = {};
    try {
      let Resp = await fetch(
        `https://crud-mern-backend-66eu.onrender.com/changePswrd/${UserId}/${Password}/${NewPassword}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await Resp.json();

      if (Resp.ok) {
        console.log(data);
      } else {
        Swal.fire({
          title: 'failed to update password',
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
        title: 'failed to update password',
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
  };

  return (
    <>
      <div className="flex justify-center align-middle mx-12 p-10 flex-col ">
        <div className=" flex justify-center align-middle mb-8 flex-row">
          <button
            onClick={ViewFunc}
            xx
            className="px-4 py-2 bg-pink-500 text-white font-sans font-bold mx-4 rounded hover:bg-pink-700"
          >
            View Profile
          </button>
          <button
            onClick={UpdateFunc}
            n
            className="px-4 py-2 bg-pink-500 text-white font-sans font-bold mx-4 rounded hover:bg-pink-700"
          >
            Update Profile
          </button>
          <button
            onClick={ChngPassFunc}
            n
            className="px-4 py-2 bg-pink-500 text-white font-sans font-bold mx-4 rounded hover:bg-pink-700"
          >
            Change Password
          </button>
        </div>
        <hr />

        {/* Displating data */}
        <div className=" flex justify-center flex-row">
          {btn1 ? (
            <div className="mt-5">
              <h1 className="px-2 m-1 text-[24px] font-sans font-bold text-center">
                Your Profile
              </h1>
              <div className="flex justify-around flex-row m-0">
                <div className="profile w-52 h-52 rounded-full border-4 my-8">
                  {Image ? (
                    <img src={Image} alt="User Profile" />
                  ) : (
                    <p>Loading image...</p>
                  )}
                </div>
                <div className="flex justify-start flex-col mt-12 ml-20">
                  <span className="p-2 m-2 font-sans font-medium">
                    Name : - <span className=" text[20px]">{Name}</span>
                  </span>
                  <span className="p-2 m-2 font-sans font-medium">
                    Email Id : - <span className=" text[20px]">{Email}</span>
                  </span>
                  <span className="p-2 m-2 font-sans font-medium">
                    Country : - <span className=" text[20px]">{Country}</span>
                  </span>
                </div>
              </div>
            </div>
          ) : null}

          {/* display data */}

          {btn2 ? (
            <form
              className="w-92 mt-6"
              onSubmit={(e) => {
                e.preventDefault();
                UpdateProfile();
              }}
            >
              <h1 className="px-2 m-1 text-[24px] font-sans font-bold text-center">
                Update Your Information
              </h1>
              <div className="flex justify-center align-middle m-0">
                <div className="flex justify-center m-auto flex-col">
                  <div className="flex justify-between m-auto flex-row">
                    <span className="flex justify-start m-auto flex-col">
                      <input
                        type="file"
                        name="file"
                        id="file"
                        onChange={handleImageChange}
                        className="p-4 m-4 border border-b-black text-[18px] rounded w-80"
                      />
                    </span>
                    {selectedImage && (
                      <span className="flex justify-center m-auto flex-col">
                        <div className="flex justify-center align-middle flex-row p-4 mx-4 w-80">
                          <div className="img-preview-profile w-28 h-28 rounded-full border-4">
                            <img
                              src={selectedImage}
                              className="w-28 h-30"
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
                      <label className="text-gray-800 text-[18px] text-left ml-3 mt-5">
                        Enter Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="p-2 m-3 border border-b-black text-[18px] rounded w-80"
                        value={Name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </span>

                    <span className="flex justify-center m-auto flex-col">
                      <label className="text-gray-800 text-[18px] text-left ml-3 mt-5">
                        Enter Your Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="p-2 m-3 border border-b-black text-[18px] rounded w-80"
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </span>
                  </div>
                  <div className="flex justify-center m-auto flex-row">
                    <span className="flex justify-center m-auto flex-col">
                      <label className="text-gray-800 text-[18px] text-left ml-3 mt-5">
                        Enter Your Country Name
                      </label>
                      <input
                        type="text"
                        name="country"
                        id="country"
                        className="p-2 m-3 border border-b-black text-[18px] rounded w-80"
                        value={Country}
                        onChange={(e) => setCountry(e.target.value)}
                      />
                    </span>
                  </div>
                  <button
                    className="p-3 bg-amber-400 text-[18px] font-medium m-5 w-32 rounded-full"
                    type="submit"
                  >
                    Update
                  </button>
                </div>
              </div>
            </form>
          ) : null}

          {btn3 ? (
            <div>
              <h1 className="px-2 mt-4 text-[24px] font-sans font-bold text-center">
                Change Password
              </h1>
              <div className="flex justify-around flex-row m-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    ChangePass();
                  }}
                >
                  <div className="flex justify-start flex-col mt-5">
                    <span className="p-2 m-2 font-sans font-medium">
                      <span className=" text[20px]">
                        <input
                          type="text"
                          value={Password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="p-2 m-2 border-2 border-black rounded font-sans font-semibold text-[18px]"
                          placeholder="Enter Old Password"
                          name="password"
                          id="password"
                        />
                      </span>
                    </span>
                    <span className="p-2 m-2 font-sans font-medium">
                      <span className=" text[20px]">
                        <input
                          value={NewPassword}
                          onChange={(e) => {
                            setNewPassword(e.target.value);
                          }}
                          on
                          type="text"
                          className="p-2 m-2 border-2 border-black rounded font-sans font-semibold text-[18px]"
                          placeholder="Enter New Password"
                          name="passsword"
                          id="password"
                        />
                      </span>
                    </span>
                    <span className="p-2 m-2 font-sans font-medium justify-center flex">
                      <span className=" text[20px] font-bold text-white">
                        <button
                          type="submit"
                          className="px-4 py-2 m-2 bg-green-600 rounded"
                        >
                          Update Password
                        </button>
                      </span>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <Footer />
    </>
  );
}
