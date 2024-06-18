import { useEffect, useState } from "react";
import "../App.css";
import Footer from "./Footer";
import Swal from "sweetalert2";

export default function Cart() {
  const [showModal, setShowModal] = useState(false);
  const [EditModal, setEditModal] = useState(false);

  const [UserId, setUserId] = useState("");
  const [ArrayData, setArrayData] = useState([]);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("Login"));
    console.log(data._id);
    setUserId(data._id);
  }, [UserId == ""]);

  useEffect(() => {
    if (UserId) {
      GetArrayProductList();
    }
    // console.log(ArrayData);
  }, [UserId]);

  async function GetArrayProductList() {
    try {
      let result = await fetch(`http://localhost:4500/GetMyData/${UserId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await result.json();
      // console.log(data);

      if (result.ok) {
        setArrayData(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const convertToBase64 = (buffer, contentType) => {
    return new Promise((resolve, reject) => {
        const blob = new Blob([new Uint8Array(buffer)], { type: contentType });
        const reader = new FileReader();
        reader.onloadend = () => {
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};

  const [ShowImage, setShowImage] = useState("");
  const [ShowTitle, setShowTitle] = useState("");
  const [Showdescription, setShowdescription] = useState("");
  const [ShowId, setId] = useState("");

  const ShowDetailData = async (item) => {
    console.log("Showing details for:", item);
    try {
      let resp = await fetch(
        `http://localhost:4500/GettingInnerData/${UserId}/${item}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await resp.json();
      // console.log(data);

      if (resp.ok) {
        setShowModal(true);

        const buffer = new Uint8Array(data.ProductImage.Data.data);
        console.log(buffer);
        const blob = new Blob([buffer], {
          type: data.ProductImage.contentType,
        });
        const reader = new FileReader();
        reader.onloadend = () => {
          setShowImage(reader.result);
        };
        reader.readAsDataURL(blob);

        setShowTitle(data.Title);
        setShowdescription(data.description);
        setId(data._id);
      }
    } catch (error) {
      console.error("Show Error" + error);
    }
  };

  const EditBtnCall = async (item) => {
    try {
      let resp = await fetch(
        `http://localhost:4500/GettingInnerData/${UserId}/${item}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let data = await resp.json();
      console.log(data);

      if (resp.ok) {
        setEditModal(true);
        // setShowImage(data.ProductImage);
        setShowTitle(data.Title);
        setShowdescription(data.description);
        setId(data._id);
        console.log(data._id);
        console.log(ShowId);
      }
    } catch (error) {
      console.error("Show Error" + error);
    }
  };

  const DeleteSwalFuc = async (item) => {
    console.log("Deleting item:", item);
    try {
      const resp = await fetch(
        `http://localhost:4500/deleteProductItem/${UserId}/${item}`,
        {
          method: "DELETE",
        }
      );
      const data = await resp.json();

      if (resp.ok) {
        console.log(data);
        GetArrayProductList();
      }
    } catch (error) {
      console.error("Error -> " + error);
    }
  };

  const UpdateProduct = async () => {
    try {
      console.log(UserId);
      console.log(ShowId);
      const formData = new FormData();
      formData.append("Title", ShowTitle);
      formData.append("description", Showdescription);
      formData.append("ProductImage", ShowImage);

      const resp = await fetch(
        `http://localhost:4500/UpdateProduct/${UserId}/${ShowId}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const data = await resp.json();

      if (resp.ok) {
        console.log(data);
        GetArrayProductList();
      } else {
        console.error("Update failed", data);
      }
    } catch (error) {
      console.error("update error: " + error);
    }
  };

  // Fetching Image
  function getImageSource2(imageData) {
    if (!imageData || !imageData.Data || !imageData.Data.data || !imageData.contentType) {
      return "";
    }
  
    const buffer = new Uint8Array(imageData.Data.data);
    const blob = new Blob([buffer], {
      type: imageData.contentType,
    });
    const reader = new FileReader();
  
    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
  
      reader.onerror = reject;
  
      reader.readAsDataURL(blob);
    });
  }

  function arrayBufferToBase64(buffer) {
    const binary = new Uint8Array(buffer);
    const bytes = [];

    binary.forEach((byte) => bytes.push(byte));

    return btoa(String.fromCharCode.apply(null, bytes));
  }

  return (
    <>
      <div className="flex justify-center align-middle my-auto mt-3">
        <h1 className=" font-sans font-extrabold text-[28px]">Your Cart</h1>
      </div>

      <div classNameName="flex justify-center m-auto p-4">
        <div className=" mx-12 mt-8">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 text-[14px]">
                  Sr No
                </th>
                <th scope="col" className="px-6 py-3 text-[14px]">
                  Image
                </th>
                <th scope="col" className="px-6 py-3 text-[14px]">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-[14px]">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-[14px]">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-[14px]">
                  Show
                </th>
                <th scope="col" className="px-6 py-3 text-[14px]">
                  Edit
                </th>
                <th scope="col" className="px-6 py-3 text-[14px]">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody className="tbody">
              {ArrayData.map((item, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4 font-bold text-[16px]">
                    {index + 1}
                  </td>
                  <td className="px-4 py-1 font-bold text-[16px]">
                  <ProductCard key={item._id} item={item} convertToBase64={convertToBase64} />

                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-[16px]"
                  >
                    {item.Title}
                  </th>
                  <td className="px-6 py-4 text-[16px]">{item.description}</td>
                  <td className="px-6 py-4 text-[16px]">{item.Date}</td>
                  <td className="px-4 py-2 text-[16px]">
                    <button
                      onClick={() => ShowDetailData(item._id)}
                      className="font-sans font-bold text-[15px] px-4 py-2 bg-blue-500 rounded text-white hover:bg-blue-600"
                    >
                      <div className="show-image"></div>
                    </button>
                  </td>
                  <td className="px-4 py-2 text-[16px]">
                    <button
                      onClick={() => EditBtnCall(item._id)}
                      className=" font-sans font-bold text-[15px] px-4 py-2 bg-green-500 rounded text-white hover:bg-green-600"
                    >
                      <div className="edit-image"></div>
                    </button>
                  </td>
                  <td className="px-4 py-2 text-[16px]">
                    <button
                      onClick={() => DeleteSwalFuc(item._id)}
                      className=" font-sans font-bold text-[15px] px-4 py-2 bg-red-500 rounded text-white hover:bg-red-600"
                    >
                      <div className="delete-image"></div>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div classNameName="side-images-2">
        <img
          src="/public/gradient.png"
          className="s-img-in-01 opacity-65"
          alt=""
        />
      </div>

      {/* modal show*/}
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-[24px] font-semibold">{ShowTitle}</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-100 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-100 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    <img src={ShowImage} className=" h-80" alt="" />
                  </p>
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    {Showdescription}
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {EditModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-4 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-[24px] font-semibold">Update Product</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-100 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setEditModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-100 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    UpdateProduct();
                  }}
                >
                  <div className="relative p-6 flex-auto">
                    <p className="my-4 text-blueGray-500 flex flex-col text-lg leading-relaxed">
                      <span className="flex justify-between m-auto flex-row">
                        <input
                          type="file"
                          className="border-2 border-black p-2 m-6 rounded"
                          name="ProductImage"
                          id="ProductImage"
                          onChange={(e) => {
                            setShowImage(e.target.files[0]);
                          }}
                        />
                        <img src={ShowImage} alt="img not found" />
                      </span>
                      <input
                        type="text"
                        className="border-2 border-black p-2 m-6 rounded"
                        name="Title"
                        id="Title"
                        value={ShowTitle}
                        onChange={(e) => {
                          setShowTitle(e.target.value);
                        }}
                        placeholder="Change Your Title"
                      />
                      <input
                        type="text"
                        className="border-2 border-black p-2 m-6 rounded"
                        name="Description"
                        id="Description"
                        value={Showdescription}
                        onChange={(e) => {
                          setShowdescription(e.target.value);
                        }}
                        placeholder="Change Your Title"
                      />
                    </p>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setEditModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      <Footer />
    </>
  );
}

const ProductCard = ({ item, convertToBase64 }) => {
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        convertToBase64(item.ProductImage.Data.data, item.ProductImage.contentType).then(base64 => {
            setImageSrc(base64);
        });
    }, [item, convertToBase64]);

    return (
        <div>
            <h2>{item.name}</h2>
            {imageSrc ? <img src={imageSrc} alt={item.name} /> : <p>Loading image...</p>}
        </div>
    );
};
