import React, { useState, useEffect } from "react";
import Header from "../../shared/Header";
import Sidebar from "../../shared/Sidebar";
import HeadBar from "../../components/HeadBar";
import Select from "react-select";
import config from "../../config/config";
import { Toaster, toast } from "react-hot-toast";

function index() {
  const formData = new FormData();

  const [image, setImage] = useState(null);
  const [dataUrl, setDataUrl] = useState(null);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    fetch(
      `${config.baseUrl}/api/product?id=${localStorage.getItem(
        "edit_product_id"
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setInputData(data);
        setImage(data.image);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

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
    // try {
    //   const response = await fetch(`${config.baseUrl}/api/addProduct`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(inputData),
    //   });

    //   if (response.ok) {
    //     toast.success("Product created successfully");
    //   } else {
    //     const errorData = await response.json();
    //     toast.error("Error: " + errorData.error);
    //   }
    // } catch (error) {
    //   toast.error("An error occurred while creating the Product");
    // }
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
              title={"Edit Product"}
              description={"Edit a product along with description"}
            />

            {/* <form onSubmit={handleSubmit}> */}
            {loading && (
              <p className="ml-[300px] p-[30px] font-bold text-[30px] text-blue-400">
                Loading Data
                <img className="inline-block" src="./images/spin.gif" alt="" />
              </p>
            )}
            {!loading && (
              <form onSubmit={handleSubmit}>
                <div className="shadow-md border bg-grey  py-12 px-8 max-w-[1000px]">
                  <div>
                    <div className=" sm:overflow-hidden sm:rounded-md">
                      <div className="space-y-6 bg-white px-4 py-5 sm:sp-6">
                        <div className="col-span-12">
                          <label
                            htmlFor="street-address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Product Title
                          </label>
                          <input
                            type="name"
                            name="name"
                            id="name"
                            value={inputData.name}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm w-[90%] border-2 text-[14px] p-[6px] mb-[3px] rounded block mb-10px"
                          />
                        </div>

                        <div className="col-span-12">
                          <label
                            htmlFor="street-address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Product ID
                          </label>
                          <input
                            type="text"
                            value={inputData.id}
                            name="id"
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm w-[90%] border-2 text-[14px] p-[6px] mb-[3px] rounded block mb-10px"
                          />
                        </div>
                        <div className="col-span-12">
                          <label
                            htmlFor="street-address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Category
                          </label>
                          <div className="flex gap-2 items-center">
                            <label className="flex gap-2">
                              <input
                                type="radio"
                                value="Box"
                                checked={inputData.category === "Box"}
                                onChange={() =>
                                  setInputData({
                                    ...inputData,
                                    category: "Box",
                                  })
                                }
                              />
                              Box
                            </label>
                            <label className="flex gap-2">
                              <input
                                type="radio"
                                value="Accessory"
                                checked={inputData.category === "Accessory"}
                                onChange={() =>
                                  setInputData({
                                    ...inputData,
                                    category: "Accessory",
                                  })
                                }
                              />
                              Accessory
                            </label>
                          </div>
                        </div>

                        <div className="col-span-12">
                          <label
                            htmlFor="street-address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Product Description
                          </label>
                          <input
                            type="text"
                            value={inputData.description}
                            name="description"
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm w-[90%] border-2 text-[14px] p-[6px] mb-[3px] rounded block mb-10px"
                          />
                        </div>

                        <div className="col-span-12">
                          <label
                            htmlFor="street-address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Product Price ($)
                          </label>
                          <input
                            type="number"
                            value={inputData.price}
                            name="price"
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm w-[90%] border-2 text-[14px] p-[6px] mb-[3px] rounded block mb-10px"
                          />
                        </div>
                        <div className="col-span-12">
                          <label
                            htmlFor="street-address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Tabular Description
                          </label>
                          {inputData.tabularDescription.map((each, index) => (
                            <div className="flex gap-2" key={index}>
                              <input
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
                                    tabularDescription:
                                      updatedTabularDescription,
                                  });
                                }}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm w-[90%] border-2 text-[14px] p-[6px] mb-[3px] rounded block mb-10px"
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
                                      {
                                        [Object.keys(each)[0]]: e.target.value,
                                      },
                                      ...inputData.tabularDescription.slice(
                                        index + 1
                                      ),
                                    ],
                                  };
                                  setInputData(updatedData);
                                }}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm w-[90%] border-2 text-[14px] p-[6px] mb-[3px] rounded block mb-10px"
                              />
                            </div>
                          ))}

                          <button
                            className="flex items-center gap-1 border-2 px-1 py-0.5 rounded-md text-sm text-gray-600  border-gray-300 "
                            onClick={handleAddTabular}
                          >
                            + Add field
                          </button>
                        </div>

                        <div className="flex items-center justify-center w-full mb-6">
                          {image && (
                            <img
                              id="dropzone-image"
                              required
                              className="w-full h-32  object-cover"
                              src={
                                typeof image === "string"
                                  ? image
                                  : URL.createObjectURL(image)
                              }
                              alt=""
                            />
                          )}
                          <label
                            for="dropzone-file"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100"
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
                              <p className="mb-2 text-sm px-5 text-gray-500 dark:text-gray-400">
                                Upload square 720px x 720px resolution image of
                                the product
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
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

                        <div className="bg-gray-50 py-3 text-right sm:px-1">
                          <button
                            type="submit"
                            className="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-bold text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 w-[100%] bg-green-400 via-[#620000] to-[#550000]"
                          >
                            Save Product
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default index;
