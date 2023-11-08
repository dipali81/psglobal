import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

//Defaults
import HeadBar from "../../components/HeadBar";
import Sidebar from "../../shared/Sidebar";
import Header from "../../shared/Header";
import config from "../../config/config";

import Select from "react-select";
import { IoResizeOutline } from "react-icons/io5";

import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsCalendar } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";

const options = [
  { value: "1", label: "Oldest" },
  { value: "-1", label: "Newest" },
];

function index() {
  const componentRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [itemId, setItemId] = useState(null);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");


  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleOptionChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setSort(selectedOption.value);
  };

  const [productData, setProductData] = useState("");
  const [push, setPush] = useState(false);
  const [load, setLoad] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(-1);
  // eslint-disable-next-line no-unused-vars
  const [skip, setSkip] = useState(0);
  //   const [isOpen, setIsOpen] = useState(false);

  //   const convertDate = date => {
  //     const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  //     const formattedDate = new Date(date).toLocaleDateString('de-DE', options);
  //     console.log(formattedDate);
  //     return formattedDate;
  //   };

  // useEffect(() => {
  //   fetch(`${config.baseUrl}/totalUsers`)
  //   .then(response => response.json())
  //   .then((data) =>{
  //     setUsers(data.count)
  //   })
  // },[])

  const navigate = useNavigate();

  useEffect(() => {
    let endDateTemp, startDateTemp;
    if (
      startDate === null ||
      endDate === null ||
      startDate == null ||
      endDate == null
    ) {
      startDateTemp = 0;
      endDateTemp = 0;
    } else {
      startDateTemp = startDate;
      endDateTemp = endDate;
    }
    fetch(`${config.baseUrl}/api/products`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProductData(data.products);
      });
  }, [load, push, sort, skip, startDate, endDate]);

  const view = (id) => {
    localStorage.setItem("view_product_id", id);
    navigate("/view-product");
  };
  const edit = (id) => {
    localStorage.setItem("edit_product_id", id);
    navigate("/edit");
  };

  // eslint-disable-next-line no-unused-vars
  const sortOrder = (event) => {
    setSort(event.target.value.value);
  };

  function exportCSV() {
    let endDateTemp, startDateTemp;
    if (
      startDate === null ||
      endDate === null ||
      startDate == null ||
      endDate == null
    ) {
      startDateTemp = 0;
      endDateTemp = 0;
    } else {
      startDateTemp = startDate;
      endDateTemp = endDate;
    }

    fetch(
      `${config.baseUrl}/api/query/export?search=${search}&sort=${sort}&skip=${skip}&datemin=${startDateTemp}&datemax=${endDateTemp}`
    )
      .then((response) => response.blob())
      .then((blob) => {
        toast.success("File is downloading");
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        const filename =
          "Products" +
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

  const modalRef = useRef(null);

  const showModal = (id) => {
    modalRef.current.classList.remove("hidden");
    modalRef.current.classList.add("flex");
    document.body.style.overflow = "hidden"; // Prevent scrolling

    setItemId(id);
  };

  const hideModal = () => {
    modalRef.current.classList.remove("flex");
    modalRef.current.classList.add("hidden");
    document.body.style.overflow = "auto"; // Restore scrolling
  };

  const handleDelete = () => {
    onDelete(itemId);
    hideModal();
  };

  
  const onDelete = async (productId) => {
    try {
      const response = await fetch(`${config.baseUrl}/api/deleteProduct/${productId}`, {
        method: 'DELETE',
      });

      if (response.status === 200) {
        const data = await response.json();
        toast.error('Product deleted successfully');
        setLoad(!load);

      } else {
        const errorData = await response.json();
        toast.error('Error occurred while deleting the product');

      }
    } catch (error) {
      console.error(error);
      toast.error('Error occurred while deleting the product');
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#f5f7fe]">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main ref={componentRef}>
          <div className=" max-w-min-content mb-[100px]  col-span-full xl:col-span-12   ml-[45px]">
            <header className="px-5 py-6 border-b border-slate-100">
              <HeadBar
                title={"Products"}
                description={"View, edit, and delete products"}
                exportCSV={exportCSV}
                isVisible={true}
              />
            </header>

            <div>
              <Toaster />
            </div>

            <div
              id="deleteModal"
              tabIndex="-1"
              aria-hidden="true"
              ref={modalRef}
              className="hidden overflow-y-auto overflow-x-hidden w-screen h-screen fixed z-50 justify-center items-center md:inset-0 bg-opacity-50 bg-gray-800 backdrop-blur"
            >
              <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                <div className="relative p-4 text-center bg-white rounded-lg shadow-md border border-slate-200 sm:p-5 ">
                  <button
                    type="button"
                    onClick={hideModal}
                    className="text-gray-500 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                    data-modal-toggle="deleteModal"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                  <svg
                    className="text-slate-500 w-11 h-11 mb-3.5 mx-auto"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <p className="mb-4 text-slate-800 ">
                    This will delete all the information about this product from
                    the database. Do you still want to proceed?
                  </p>
                  <div className="flex justify-center items-center space-x-4">
                    <button
                      onClick={hideModal}
                      data-modal-toggle="deleteModal"
                      type="button"
                      className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border-2   border-slate-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 "
                    >
                      No
                    </button>
                    <button
                      onClick={handleDelete}
                      className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 "
                    >
                      Yes, I am sure
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative px-4 ">
              <div className="flex  justify-between items-center border rounded-md py-2 px-5 bg-slate-600 max-w-[1200px]">
                <div>
                  <BsCalendar className="text-white mr-4 inline-block" />
                  <input
                    type="date"
                    className="text-[14px] font-semibold text-slate-700 focus:outline-none border-0 p-2 w-40 rounded-md  border-gray-300"
                    value={startDate}
                    onChange={handleStartDateChange}
                  />
                  <p className="inline-block text-white px-4 ">to</p>
                  <input
                    type="date"
                    className="text-[14px] font-semibold text-slate-700 focus:outline-none border-0 p-2 w-40 rounded-md  border-gray-300"
                    value={endDate}
                    onChange={handleEndDateChange}
                  />
                </div>

                <div className="flex items-center">
                  <BsSearch className="text-white mr-3" />
                  <input
                    type="text"
                    className="rounded-sm shadow-lg text-slate-700 text-sm w-[200px] px-[15px] mr-8 py-2 inline-block rounded mr-4 focus:none"
                    placeholder="Search by fields"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />

                  <Select
                    className="sm:w-[200px]  text-[12px]   shadow-lg text-slate-600 sm:text-sm text-[12px] rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-[200px] "
                    options={options}
                    value={selectedOption}
                    onChange={handleOptionChange}
                    placeholder="Filter Order"
                  />
                </div>
              </div>
            </div>
            <div className="p-3">
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="table-auto bg-white border shadow-sm w-[100%] max-w-[1200px] ">
                  {/* Table header */}
                  <>
                    <thead className="text-xs font-semibold uppercase text-slate-600 bg-slate-200">
                      <tr>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-bold text-left">Product ID</div>
                        </th>

                        <th className="p-2 whitespace-nowrap">
                          <div className="font-bold text-left">
                            Product Name
                          </div>
                        </th>

                        <th className="p-2 whitespace-nowrap">
                          <div className="font-bold text-left">Category</div>
                        </th>

                        <th className="p-2 whitespace-nowrap">
                          <div className="font-bold text-left">Price</div>
                        </th>

                        <th className="p-2 whitespace-nowrap">
                          <div className="font-bold text-left">Description</div>
                        </th>

                        <th className="p-2 whitespace-nowrap">
                          <div className="font-bold text-left">View</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-bold text-left">Edit</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-bold text-left">Delete</div>
                        </th>

                        <th className="p-2 whitespace-nowrap">
                          <div className="font-bold text-left"></div>
                        </th>
                      </tr>
                    </thead>
                  </>

                  <tbody className="text-sm divide-y divide-slate-100">
                    {productData !== "" &&
                      productData.map((product) => {
                        return (
                          <>
                            <React.Fragment>
                              <tr className="tr-main w-[100]" key={product._id}>
                                <td className="p-2 whitespace-nowrap">
                                  <div className="text-left">{product.id}</div>
                                </td>

                                <td className="p-2 whitespace-nowrap">
                                  <div className="font-semibold text-slate-800">
                                    {product.name}
                                  </div>
                                </td>

                                <td className="p-2 whitespace-nowrap">
                                  <div className="text-left">
                                    {product.category}
                                  </div>
                                </td>

                                <td className="p-2 whitespace-nowrap">
                                  <div className="text-left">
                                    {product.price} $
                                  </div>
                                </td>

                                <td className="p-2 whitespace-nowrap">
                                  <div className="text-left">
                                    {product.category}
                                  </div>
                                </td>

                                {/* <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{(order.createdon).slice(0,10)}</div>
                      </td>  */}

                                <td className="p-2 whitespace-nowrap">
                                  <div className="text-left">
                                    <button
                                      className="bg-gray-200 inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-gray-500  hover:bg-gray-300 transition-all hover:text-gray-800 focus:relative"
                                      onClick={() => view(product._id)}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-4 w-4"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                        />
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                      </svg>
                                      View
                                    </button>
                                  </div>
                                </td>

                                <td className="p-2 whitespace-nowrap">
                                  <div className="text-left">
                                    <button
                                      onClick={() => edit(product._id)}
                                      className="bg-[#676aee] inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-white hover:text-gray-200 transition-all hover:bg-indigo-700 focus:relative"
                                    >
                                      <AiOutlineEdit className="inline-block mr-1" />
                                      Edit
                                    </button>
                                  </div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                  <div className="text-left">
                                    <button
                                      onClick={() => showModal(product._id)}
                                      className="inline-flex items-center gap-2 border-2 rounded-md bg-red-500 px-4 py-2 text-sm text-white hover:text-slate-200 hover:bg-red-600 transition-all shadow-sm focus:relative"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        className="h-4 w-4"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                        />
                                      </svg>
                                      Delete
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            </React.Fragment>
                          </>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default index;
