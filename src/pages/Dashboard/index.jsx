import React, { useState, useEffect  } from 'react';
import {  useNavigate } from "react-router-dom"
import config from '../../config/config';
import Block from '../../components/Block';
import Sidebar from '../../shared/Sidebar';
import Header from '../../shared/Header';
import WelcomeBanner from '../../components/WelcomeBanner';

function Dashboard() {

  const navigate = useNavigate();

  const [orderData, setOrderData] = useState([])
  const [totalNewOrders, setTotalNewOrders] = useState(0)
  const [totalActive, setTotalActive] =useState(0)
  const [totalComplete, setTotalComplete] =useState(0)
  



  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [totalQueries, setTotalQueries] = useState(0);
  const [totalSale, setTotalSale] = useState(0);
  const [sales, setSales] = useState([]);

  
  useEffect(() => {
    // Make a GET request to your API endpoint
    fetch(`${config.baseUrl}/api/query/total`)
      .then((response) => response.json())
      .then((data) => {
        setTotalQueries(data.totalQueries);
        console.log(data.totalQueries)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const convertDate = date => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = new Date(date).toLocaleDateString('de-DE', options);
    return formattedDate;
  };

  useEffect(() => {
    fetch(`${config.baseUrl}/api/newrequest/read`)
    .then(response => response.json())
    .then((data) =>{
       setOrderData(data)
       const length= data.length;
       setTotalNewOrders(length)
      
      })
  },[])

useEffect(() => {
  fetch(`${config.baseUrl}/api/totalactiveAndCompletedOrders/count`)
  .then(response => response.json())
  .then((data) => {
    setTotalActive(data.totalActiveOrders)
    setTotalComplete(data.totalCompletedOrders)
  })
},[])


useEffect(() => {
  fetch(`${config.baseUrl}/api/sales?last7Days=true`)
  .then(response => response.json())
  .then((data) => {
    if (data && data.data && data.data.length > 0) {
      
      setSales(data.data);
    } 
  })
 
},[])

useEffect(() => {
  fetch(`${config.baseUrl}/api/salesamount-analytics`)
  .then(response => response.json())
  .then((data) => {
    if (data && data.data) {
      setTotalSale(data.data.weeklySales);
    } 
  })
},[])

const view = (id) => {
  localStorage.setItem('viewNewRequestId', id)
  navigate('/viewnewrequest')
}

  return (
    <div className="bg-[#f3f6fe] flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main  >
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Welcome banner */}
            <WelcomeBanner/>

            <div className="flex ">
              <Block
                title={"New Orders"}
                index={1}
                count={totalNewOrders}
                profit={true}
                change={"+10%"}
              />
               <Block
                title={"Active Customers"}
                index={4}
                count={totalNewOrders}
                profit={true}
                change={"+10%"}
              />
                <Block
                title={"New Subscriptions"}
                index={2}
                count={totalActive}
                profit={true}
                change={"+10%"}
              />
              <Block
                title={"Active Subscriptions"}
                index={6}
                count={totalActive}
                profit={true}
                change={"+10%"}
              />
              <Block
                title={"Queries"}
                index={3}
                count={totalQueries}
                profit={false}
                change={"+10%"}
              />
              
             

            <Block
                title={"Sales (Last 7 Days)"}
                index={5}
                count={`${totalSale}`}
                profit={true}
                change={"+0%"}
              />
            </div>
            
        <br />

                <hr />
           

          </div>

     

     
          
          <div className="flex w-full  pb-2 max-w-[1300px] px-8">
          {/* <div>
            <DashboardCard04 revenue={rev} profit={profit} dates={completionDate}/>
          </div> */}
 <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
  <h4 className="mb-6 text-xl font-semibold text-black">
    Total Sales (Last 7 Days)
  </h4>

  <div className="flex flex-col">
    <div className="grid grid-cols-3 rounded-sm bg-gray-2 sm:grid-cols-4">
      <div className="p-2.5 xl:p-5">
        <h5 className="text-sm font-medium uppercase">
          Name
        </h5>
      </div>
      <div className="p-2.5 xl:p-5">
        <h5 className="text-sm font-medium uppercase">
          Product
        </h5>
      </div>
      <div className="p-2.5 text-center xl:p-5">
        <h5 className="text-sm font-medium uppercase">
          Order ID
        </h5>
      </div>
      <div className="p-2.5 text-center xl:p-5">
        <h5 className="text-sm font-medium uppercase">
          Amount ($)
        </h5>
      </div>
    </div>

    {sales.map((sale) => (
      <div key={sale._id} className="grid grid-cols-3 rounded-sm bg-gray-2 sm:grid-cols-4">
        <div className="p-2.5 xl:p-5">
          <p>{sale?.name}</p>
        </div>
        <div className="p-2.5 xl:p-5">
          <p>{sale?.product}</p>
        </div>
        <div className="p-2.5 text-center xl:p-5">
          <p>{sale?.orderid}</p>
        </div>
        <div className="p-2.5 text-center xl:p-5">
          <p>{sale?.amount}</p>
        </div>
      </div>
    ))}
  </div>
</div>


  
          

          <div className=" max-w-min-content mb-[100px]  col-span-full xl:col-span-12   ml-[45px]">
          <div className="relative px-4">
              <div className="flex  justify-between items-center border rounded-md py-2 px-5 bg-slate-600  min-w-full">
                <h1 className="text-white">New Orders</h1>
              </div>
            </div>
     
    <div className="p-3">
              {/* Table */}
              <div className="overflow-x-auto">
              <table className="table-auto bg-white border shadow-sm w-[400px] min-w-full ">
                  {/* Table header */}
                  <>
                    <thead className="text-xs font-semibold uppercase text-slate-600 bg-slate-200">
                      <tr>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-bold text-left">Name</div>
                        </th>

                       
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-bold text-left">Date</div>
                        </th>


                        <th className="p-2 whitespace-nowrap">
                          <div className="font-bold text-left">View</div>
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
                                  <div className="font-semibold text-slate-800">
                                    {order.firstName.charAt(0).toUpperCase() +
                                      order.firstName.slice(1).toLowerCase() +
                                      " " +
                                      order.lastName.charAt(0).toUpperCase() +
                                      order.lastName.slice(1).toLowerCase()}
                                  </div>
                                </td>

                              
                               
                                <td className="p-2 whitespace-nowrap">
                                  <div className="text-left">
                                    {convertDate(order.date)}
                                  </div>
                                </td>
                               

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
    </div>


        </main>

       

      </div>
    </div>
  );
}

export default Dashboard;