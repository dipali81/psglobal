import React, { useState } from "react";
import Header from "../../shared/Header";
import Sidebar from "../../shared/Sidebar";
import HeadBar from "../../components/HeadBar";
import Select from "react-select";
import config from "../../config/config";
import { Toaster, toast } from "react-hot-toast";
import {AiOutlinePlus} from 'react-icons/ai'
import {BiSolidSave} from 'react-icons/bi'
function index() {
  const formData = new FormData();

  const [image, setImage] = useState(null);
  const [dataUrl, setDataUrl] = useState(null);
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");

  const [inputData, setInputData] = useState({
    name: "",
    id: "",
    category: "",
    description: "",
    tabularDescription: [{ "": "" }],
    image: "",
    price: "",
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    setImage(e.target.files[0]);
    // create a new FileReader object
    const reader = new FileReader();

    // set up the reader to load the selected image
    reader.onload = () => {
      // update the src of the img element to the data URL generated by the reader
      const img = document.getElementById("dropzone-image");
      img.src = reader.result;
      setInputData((prevData) => ({
        ...prevData,
        image: reader.result,
      }));
      setDataUrl(reader.result);
    };

    // read the selected image as a data URL
    reader.readAsDataURL(selectedImage);

    // set the state with the selected image

    notify("Bild wurde hinzugefügt.");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((data) => ({
      ...data,
      [name]: value,
    }));
  };
  const handleAddTabular = (e) => {
    e.preventDefault();
    if (
      Object.keys(
        inputData.tabularDescription[inputData.tabularDescription.length - 1]
      )[0]
    ) {
      const updatedTabularData = [...inputData.tabularDescription, { "": "" }];
      const updatedInputData = {
        ...inputData,
        tabularDescription: updatedTabularData,
      };
      setInputData(updatedInputData);
      console.log("addded");
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(inputData);
    try {
      const response = await fetch(`${config.baseUrl}/api/addProduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      });

      if (response.ok) {
        window.scrollTo(0, 0);

        toast.success("Product created successfully");
        //Refresh page and clear form and scroll to top

        window.location.reload();
        setInputData({
          name: "",
          id: "",
          category: "",
          description: "",
          tabularDescription: [{ "": "" }],
          image: "",
          price: "",
        });

      } else {
        const errorData = await response.json();
        window.scrollTo(0, 0);

        toast.error("Error: " + errorData.error);
      }
    } catch (error) {
      window.scrollTo(0, 0);

      toast.error("An error occurred while creating the Product");
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <Toaster />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Welcome banner */}
            <HeadBar
              title={"Add Product"}
              description={"Add a new product along with description"}
            />

            {/* <form onSubmit={handleSubmit}> */}

            <form onSubmit={handleSubmit}>
              <div className="shadow-md border  max-w-[1000px]">
                <div>
                  <div className=" sm:overflow-hidden sm:rounded-md">
                    <div className="space-y-6 bg-white px-4 py-5 sm:sp-6">
                      <div className="mb-6">
                        <label
                          className="block mb-2 text-sm font-medium "
                          htmlFor=""
                        >
                          Product Title
                        </label>
                        <input
                          className="block w-full px-4 py-3 mb-2 text-sm placeholder-gray-500 bg-white border border-gray-300 rounded"
                          type="name"
                          name="name"
                          id="name"
                          value={inputData.name}
                          onChange={handleChange}
                          required
                          placeholder="Enter Product Title"
                        />
                      </div>

                      <div className="mb-6">
                        <label
                          className="block mb-2 text-sm font-medium "
                          htmlFor=""
                        >
                          Product ID
                        </label>
                        <input
                          className="block w-full px-4 py-3 mb-2 text-sm placeholder-gray-500 bg-white border border-gray-300 rounded"
                          type="text"
                          value={inputData.id}
                          name="id"
                          onChange={handleChange}
                          required
                          placeholder="Enter Product ID"
                        />
                      </div>

                      <div className="mb-6">
                        <label
                          className="block mb-2 text-sm font-medium "
                          htmlFor=""
                        >
                          Category
                        </label>

                        <div className="flex">
                          <div className="flex w-64 mr-4 items-center pl-4 border border-gray-200 rounded ">
                            <input
                              type="radio"
                              value="Box"
                              checked={inputData.category === "Box"}
                              onChange={() =>
                                setInputData({ ...inputData, category: "Box" })
                              }
                              id="bordered-radio-1"
                              name="bordered-radio"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  "
                            />
                            <label
                              for="bordered-radio-1"
                              className="w-full py-4 ml-2 text-sm font-medium text-gray-900 "
                            >
                              Box
                            </label>
                          </div>
                          <div className="flex w-64  items-center pl-4 border border-gray-200 rounded ">
                            <input
                              id="bordered-radio-2"
                              type="radio"
                              value="Accessory"
                              checked={inputData.category === "Accessory"}
                              onChange={() =>
                                setInputData({
                                  ...inputData,
                                  category: "Accessory",
                                })
                              }
                              name="accessory"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500   "
                            />
                            <label
                              for="bordered-radio-2"
                              className="w-full py-4 ml-2 text-sm font-medium text-gray-900 "
                            >
                              Accessory
                            </label>
                          </div>
                        </div>
                      </div>

                   

                      <div class="mb-6">
                      <label
                          className="block mb-2 text-sm font-medium "
                          htmlFor=""
                        >
                          Product Description
                        </label>

                        <textarea
                          className="block w-full px-4 py-3 mb-2 text-sm placeholder-gray-500 bg-white border rounded "
                          value={inputData.description}
                          name="description"
                          onChange={handleChange}
                          rows="5"
                          placeholder="Write something..."
                        ></textarea>
                      </div>

                      <div className="mb-6">
                        <label
                          className="block mb-2 text-sm font-medium "
                          htmlFor=""
                        >
                          Product Price ($)
                        </label>
                        <input
                          className="block w-full px-4 py-3 mb-2 text-sm placeholder-gray-500 bg-white border border-gray-300 rounded"
                          type="number"
                          value={inputData.price}
                          name="price"
                          onChange={handleChange}
                          required
                         
                          placeholder="Enter Product Price"
                        />
                      </div>
                     
                      <div className="mb-6">
                        <label
                          className="block mb-2 text-sm font-medium "
                          htmlFor=""
                        >
                        Tabular Description
                        </label>
                        {inputData.tabularDescription.map((each, index) => (
                          <div className="flex gap-2" key={index}>
                        
                        <input
                          className="mr-3 block w-full px-4 py-3 mb-2 text-sm placeholder-gray-500 bg-white border border-gray-300 rounded"
                          type="text"
                          value={Object.keys(each)[0]}
                          placeholder="Add property name here"
                          name="key"
                          onChange={(e) => {
                            const newKey = e.target.value;

                            // Create a copy of the current tabularDescription array
                            const updatedTabularDescription = [
                              ...inputData.tabularDescription,
                            ];

                            // Update the key of the selected object
                            updatedTabularDescription[index] = {
                              [newKey]: Object.values(each)[0],
                            };

                            setInputData({
                              ...inputData,
                              tabularDescription: updatedTabularDescription,
                            });
                          }}
      
                        />

                          
                            <input
                              type="text"
                              value={Object.values(each)[0]}
                              name="value"
                              placeholder="Add property value here"
                              onChange={(e) => {
                                const updatedData = {
                                  ...inputData,
                                  tabularDescription: [
                                    ...inputData.tabularDescription.slice(
                                      0,
                                      index
                                    ),
                                    { [Object.keys(each)[0]]: e.target.value },
                                    ...inputData.tabularDescription.slice(
                                      index + 1
                                    ),
                                  ],
                                };
                                setInputData(updatedData);
                              }}
                              className="block w-full px-4 py-3 mb-2 text-sm placeholder-gray-500 bg-white border border-gray-300 rounded"
                              />
                          </div>
                        ))}
                        <button
onClick={handleAddTabular}
className="mt-2 rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-indigo-600 active:shadow-none shadow-lg bg-gradient-to-tr from-indigo-600 to-indigo-500 border-indigo-700 text-white">
<span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
<span className="relative">Add Field <AiOutlinePlus className="inline-block ml-2"/></span>
</button>
                        </div>
                   
                    

                      <div className="flex items-center justify-center w-full mb-6">
                        {image && (
                          <img
                            id="dropzone-image"
                            required
                            className="w-full h-32  object-cover"
                            src={image ? URL.createObjectURL(image) : ""}
                            alt=""
                          />
                        )}
                        <label
                          for="dropzone-file"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-400 border-dashed rounded cursor-pointer bg-slate-50 transition-all  hover:bg-slate-200"
                        >
                          <div className="flex flex-col items-center justify-center pt-3 pb-3 mt-3">
                            <svg
                              aria-hidden="true"
                              className="w-8 h-8 mb-2 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              ></path>
                            </svg>
                            <p className="mb-2 text-sm px-5 text-gray-500 ">
                              Upload square 468px 468px resolution image of
                              the product
                            </p>
                            <p className="text-xs text-gray-500 ">
                              PNG or JPG{" "}
                            </p>
                          </div>
                          <input
                            id="dropzone-file"
                            onChange={handleImageChange}
                            type="file"
                            accept="image/png, image/jpeg"
                            className="hidden"
                          />
                        </label>
                      </div>

                     
                      <button
                        type="submit"

className="mt-2 rounded relative w-full inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-green-600 active:shadow-none shadow-lg bg-gradient-to-tr from-green-600 to-green-400 border-green-600 text-white">
<span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
<span className="relative">Save Product <BiSolidSave className="inline-block ml-2"/></span>
</button>
               
                  
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default index;
