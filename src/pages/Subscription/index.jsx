import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

//Defaults
import HeadBar from "../../components/HeadBar";
import Sidebar from "../../shared/Sidebar";
import Header from "../../shared/Header";
import config from "../../config/config";
import Chart from 'react-apexcharts';


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

  const [orderData, setOrderData] = useState("");
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: 'line-chart'
      },
      xaxis: {
        categories: []
      },
      yaxis: {
        title: {
          text: 'Amount'
        }
      }
    },
    series: [
      {
        name: 'Amount',
        data: []
      }
    ]
  });
  const [push, setPush] = useState(false);
  const [load, setLoad] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(-1);
  // eslint-disable-next-line no-unused-vars
  const [skip, setSkip] = useState(0);
  //   const [isOpen, setIsOpen] = useState(false);

    const convertDate = date => {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      const formattedDate = new Date(date).toLocaleDateString('de-DE', options);
      console.log(formattedDate);
      return formattedDate;
    };

    useEffect(() => {
      fetch(`${config.baseUrl}/api/sales`)
        .then(response => response.json())
        .then(data => {
          const uniqueDates = [...new Set(data.data.map(item => convertDate(item.createdOn)))];
          const amounts = [];
    
          data.data.forEach(item => {
            const date = convertDate(item.createdOn);
            if (!amounts[date]) {
              amounts[date] = 0;
            }
            amounts[date] += item.amount;
          });
    
          const formattedAmounts = uniqueDates.map(date => amounts[date]);
    
          const chartData = {
            options: {
              chart: {
                id: 'line-chart'
              },
              xaxis: {
                categories: uniqueDates
              },
              yaxis: {
                title: {
                  text: 'Amount'
                }
              }
            },
            series: [
              {
                name: 'Amount',
                data: formattedAmounts
              }
            ]
          };
    
          setChartData(chartData);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, []);
    

  const navigate = useNavigate();

  

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
          "Subscription" +
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
                title={"Subscription"}
                description={
                  "View, edit, and delete Subscription"
                }
                exportCSV={exportCSV}
                isVisible={true}
              />
            </header>

            <div>
              <Toaster />
            </div>

           

           
            <div className="p-3">
            <Chart
        options={chartData.options}
        series={chartData.series}
        type="line"
        width={600}
      />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default index;
