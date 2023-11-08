import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

//Defaults
import HeadBar from "../../components/HeadBar";
import Sidebar from "../../shared/Sidebar";
import Header from "../../shared/Header";
import config from "../../config/config";



import Select from "react-select";

import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { BsCalendar } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";

const options = [
  { value: "1", label: "Oldest" },
  { value: "-1", label: "Newest" },
];

function Query() {
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

  const [orderData, setOrderData] = useState("");
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
    fetch(
      `${config.baseUrl}/api/users?search=${search}&sort=${sort}&skip=${skip}&datemin=${startDateTemp}&datemax=${endDateTemp}`
    )
      .then((response) => response.json())
      .then((data) => setOrderData(data));
  }, [load, push, search, sort, skip, startDate, endDate]);

  const view = (id) => {
    localStorage.setItem("query_id", id);
    navigate("/showquery");
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
          "Users" +
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

    setItemId(id);
  };

  const hideModal = () => {
    modalRef.current.classList.remove("flex");
    modalRef.current.classList.add("hidden");
  };

  const handleDelete = () => {
    onDelete(itemId);
    hideModal();
  };

  async function onDelete(id) {
    const response = await fetch(`${config.baseUrl}/api/deletequery`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });

    const data = await response.json();
    console.log(data);

    if (data.status === "ok") {
      toast.success("The query was successfully deleted");
      setOrderData(
        orderData.filter(() => {
          return orderData._id !== id;
        })
      );
      setPush(!push);
      setLoad(!load);
    } else {
      toast.error("The query could not be deleted");
    }
  }
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
                title={"Users"}
                description={
                  "Navigate through the user information"
                }
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
              className="hidden overflow-y-auto overflow-x-hidden w-screen h-screen fixed  z-50 justify-center items-center md:inset-0 "
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
                  Resolved requests will be deleted from the database. Are you
                    sure you want to delete this query?
                  </p>
                  <div className="flex justify-center items-center space-x-4">
                    <button
                      onClick={hideModal}
                      data-modal-toggle="deleteModal"
                      type="button"
                      className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border-2   border-slate-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 "
                    >
                      Nein
                    </button>
                    <button
                      onClick={handleDelete}
                      className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 "
                    >
                      Ja, ich bin mir sicher
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
                          <div className="font-bold text-left">
                            User ID
                          </div>
                        </th>

                        <th className="p-2 whitespace-nowrap">
                          <div className="font-bold text-left">Name</div>
                        </th>

                        <th className="p-2 whitespace-nowrap">
                          <div className="font-bold text-left">Phone</div>
                        </th>

                        <th className="p-2 whitespace-nowrap">
                          <div className="font-bold text-left">Email</div>
                        </th>
                       
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-bold text-left">Category</div>
                        </th>

                        <th className="p-2 whitespace-nowrap">
                          <div className="font-bold text-left">Products</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-bold text-left">Total Purchases ($)</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-bold text-left">Account created on</div>
                        </th>

                        <th className="p-2 whitespace-nowrap">
                          <div className="font-bold text-left"></div>
                        </th>
                      </tr>
                    </thead>
                  </>

                  <tbody className="text-sm divide-y divide-slate-100">
                    {orderData !== "" &&
                      orderData.map((order) => {
                        return (
                          <>
                            <React.Fragment>
                              <tr className="tr-main w-[100]" key={order._id}>
                                <td className="p-2 whitespace-nowrap">
                                  <div className="text-left">
                                    <button
                                      type="button"
                                      className=" bg-red-700 rounded-lg text-white cursor-default  font-semibold text-sm px-3 py-1  "
                                    >
                                      Ungelöst{" "}
                                    </button>
                                  </div>
                                </td>

                                <td className="p-2 whitespace-nowrap">
                                  <div className="font-semibold text-slate-800">
                                    {order.name}
                                  </div>
                                </td>

                                <td className="p-2 whitespace-nowrap">
                                  <div className="text-left">{order.phone}</div>
                                </td>

                                <td className="p-2 whitespace-nowrap">
                                  <div className="text-left">{order.email}</div>
                                </td>
                              
                                <td className="p-2 whitespace-nowrap">
                                  <div className="text-left">
                                    {order.query.substring(0, 30) + "..."}
                                  </div>
                                </td>

                                {/* <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{(order.createdon).slice(0,10)}</div>
                      </td>  */}

                                <td className="p-2 whitespace-nowrap">
                                  <div className="text-left">
                                    <button
                                      className="bg-gray-200 inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-gray-500  hover:bg-gray-300 transition-all hover:text-gray-800 focus:relative"
                                      onClick={() => view(order._id)}
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
                                      Sicht
                                    </button>
                                  </div>
                                </td>

                                <td className="p-2 whitespace-nowrap">
                                  <div className="text-left">
                                    <button
                                      onClick={() => showModal(order._id)}
                                      className="bg-[#676aee] inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-white hover:text-gray-200 transition-all hover:bg-indigo-700 focus:relative"
                                    >
                                      <IoIosCheckmarkCircleOutline className="text-white" />
                                      Beschlossen
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

export default Query;
