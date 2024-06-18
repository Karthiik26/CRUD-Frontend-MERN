import { useEffect, useState } from "react";
import "../App.css";
import Footer from "./Footer";
import img from "../images/gradient.png"

function Home() {
  const [Name, setName]=useState('');

  useEffect(()=>{
    gettingData();
  })

  const gettingData = ()=> {
    let data = JSON.parse(localStorage.getItem('Login'));
    if (data) {
      console.log(data.Name);
      setName(data.Name)
    }
  }



  return (
    <>
      <div className="container flex justify-center m-auto">
        <div className="flex justify-center align-middle mt-40 p-4 flex-col ">
          <h1 className="text-[40px] font-bold text-center font-serif">
            Hello {Name}
          </h1>
          <h1 className="text-[40px] font-bold text-center font-serif">
            Welcome To Our Galaxy
          </h1>
          <h3 className="text-[16px] p-2 mt-10 text-center font-semibold font-serif" >Make Your CRUD OPERATION</h3>
          <h4 className="text-[16px] p-2 text-center font-semibold font-serif" >YOU CAN ACCESS IT AT ANY WHERE IN THE WORLD JUST USING INTERNET</h4>
        </div>
      </div>
      {/* <div className="flex justify-center relative top-5">
          <button  className="px-4 py-2 m-4 bg-blue-500 text-white font-bold font-sans text-[18px] rounded">
            Explore Your Data
          </button>
      </div> */}
      <div className="images">
        <img src={img} alt="" />
      </div>
      <div className="images2">
        <img src={img} alt="" />
      </div>
      <Footer />
    </>
  );
}

export default Home;

{
  /* <div className="text-center flex justify-between m-auto align-middle p-6 flex-row">
<div className="flex justify-center align-middle m-auto flex-col">
  <div className="flex justify-center m-auto flex-row">
    <input
      className="p-4 font-mono text-[22px] font-medium border border-black w-80 rounded-tl-full rounded-bl-full "
      type="text"
      name=""
      id=""
    />
    <button className="px-10 bg-gray-600 font-mono text-[22px] rounded-tr-full rounded-br-full  font-bold text-white">
      Add
    </button>
  </div>
</div>
<div className="flex justify-center align-middle m-auto flex-col w-96">
    <h1 className="text-[32px] p-2 m-2" >Your Data</h1>
    <div className="flex justify-center flex-row m-auto" >
        <div className="p-4 m-auto" >DATA</div>
        <div className="p-4 m-auto" >EDIT</div>
        <div className="p-4 m-auto" >DELETE</div>
    </div>
</div>
</div> */
}
