import React, { useState, useEffect, useRef } from "react";

import toast, { Toaster } from "react-hot-toast";

import Sidebar from "../../shared/Sidebar";
import Header from "../../shared/Header";
import config from "../../config/config";
import HeadBar from "../../components/HeadBar";
import { IoResizeOutline } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
function index() {
  const componentRef = useRef(null);
  const [fullPageImageVisible, setFullPageImageVisible] = useState(false);

  const toggleFullPageImage = () => {
    setFullPageImageVisible(!fullPageImageVisible);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [product, setProduct] = useState("");

  const [loading, setLoading] = useState(true);

  function exportCSV() {
    fetch(
      `${
        config.baseUrl
      }/api/viewCancelledOffer/export?id=${localStorage.getItem(
        "cancelledOfferId"
      )}`
    )
      .then((response) => response.blob())
      .then((blob) => {
        toast.success("Datei wird heruntergeladen.");

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        const filename =
          "ViewStorniertesAngebot" +
          "_" +
          new Date().getDate() +
          "-" +
          (new Date().getMonth() + 1) +
          "-" +
          new Date().getFullYear() +
          "_" +
          new Date().getHours() +
          "h-" +
          new Date().getMinutes() +
          "m-" +
          new Date().getSeconds() +
          "s.csv";
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
      });
  }

  const handleObj = (arr) => {
    const values = arr.map((obj) => obj.value).join(", ");
    console.log("values", values);
    return values;
  };

  useEffect(() => {
    fetch(
      `${config.baseUrl}/api/product?id=${localStorage.getItem(
        "view_product_id"
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main ref={componentRef}>
          <div className="px-4 sm:px-6 lg:px-8 pt-8 w-full max-w-9xl mx-auto">
            <HeadBar
              title={"View Product"}
              description={"Details about products"}
              exportCSV={exportCSV}
              isVisible={true}
            />
          </div>
          <Toaster />

          {loading && (
            <p className="ml-[300px] p-[30px] font-bold text-[30px] text-blue-400">
              Loading Data
              <img className="inline-block" src="./images/spin.gif" alt="" />
            </p>
          )}

          {!loading && (
            <div className="bg-white w-[90%] h-[100%] p-[25px] shadow-lg m-[30px] border-2 border-grey ml-[40px] ">
              <div className="px-[20px] py-[10px] font-normal text-sm">
                <label className="text-slate-700 inline-block w-[170px]  font-semibold">
                  ID :
                </label>
                <span className="">{product._id}</span>
              </div>
              <hr />
              <div className="px-[20px] py-[10px] font-normal text-sm">
                <label className="text-slate-700 inline-block w-[170px]  font-semibold">
                  Product ID :
                </label>
                <span className="">{product.id}</span>
              </div>
              <hr />
              <div className="px-[20px] py-[10px] font-normal text-sm">
                <label className="text-slate-700 inline-block w-[170px]  font-semibold">
                  Name :
                </label>
                <span className="">{product.name}</span>
              </div>
              <hr />
              <div className="px-[20px] py-[10px] font-normal text-sm">
                <label className="text-slate-700 inline-block w-[170px]  font-semibold">
                  Category :
                </label>
                <span className="">{product.category}</span>
              </div>
              <hr />
              <div className="px-[20px] py-[10px] font-normal text-sm">
                <label className="text-slate-700 inline-block w-[170px]  font-semibold">
                  Price
                </label>
                <span className="">${product.price}</span>
              </div>
              <hr />
              {product.description ? (
                <>
                  <div className="px-[20px] py-[10px] font-normal text-sm">
                    <label className="text-slate-700 inline-block w-[170px]  font-semibold">
                      Description :
                    </label>
                    <span className="">{product.description}</span>
                  </div>
                  <hr />
                </>
              ) : null}
              <div className="py-2">
                {!product.tabularDescription == null ? (
                  <table className="border-collapse p-[20px] border border-gray-400">
                    <thead>
                      <tr>
                        <th className="border text-sm border-gray-200 p-2">
                          Property
                        </th>
                        <th className="border text-sm border-gray-200 p-2">
                          Value
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.tabularDescription.map((item, index) => (
                        <tr key={index}>
                          <td className="border text-sm border-gray-200 p-2">
                            {Object.keys(item)[0]}
                          </td>
                          <td className="border text-sm border-gray-200 p-2">
                            {Object.values(item)[0]}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : null}
              </div>

              {/* <div>
                {product.image ? (
                  <>
                    <div className="px-[20px] py-[10px] font-normal text-sm mt-6">
                      <h3 className="text-[#33333] font-semibold text-3xl  ">
                        Image
                      </h3>
                    </div>
                    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <img
                        src={product.image}
                        alt={`image-${index}`}
                        className="shadow-sm border rounded-sm border-slate-200 w-[200px] h-[200px] object-cover"
                      />
                    </div>
                  </>
                ) : null}
              </div> */}



<div>
{product.image ? (
        <>
          <div className="px-[20px] py-[10px] font-normal text-sm mt-6">
            <h3 className="text-[#33333] font-semibold text-3xl  ">Image</h3>
          </div>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="relative w-[200px]" >
              <img
                src={product.image}
                alt={`image-${index}`}
                className="shadow-sm border rounded-sm border-slate-200 w-[200px] h-[200px] object-cover"
              />
              <button onClick={toggleFullPageImage} className="bg-blue-500 hover:bg-blue-600 transition hover:scale-105 text-white rounded-full p-4 absolute top-0 right-0">
                <IoResizeOutline />
              </button>
            </div>
          </div>
        </>
      ) : null}
      {fullPageImageVisible && (
        <div className="full-page-image-container">
          <div className="full-page-image">
            <img src={product.image} alt={`image-${index}`} />

            <button onClick={toggleFullPageImage} className="close-button hover:bg-red-600 transition hover:scale-105  bg-red-400 text-white rounded-full p-4 absolute top-0 right-0">
              <AiOutlineClose/>
            </button>
          </div>
        </div>
      )}
    </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default index;
