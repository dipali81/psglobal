import { useState, useEffect , useRef } from 'react';
import toast, { Toaster } from "react-hot-toast";
import Sidebar from '../../shared/Sidebar';
import Header from '../../shared/Header';
import HeadBar from '../../components/HeadBar';
import config from '../../config/config';
import {FiCopy} from 'react-icons/fi'

const ShowRevenue = () => {

  const componentRef = useRef(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [sales, setSales] = useState([])
    const [loading, setLoading] = useState(true)
 
const handleCopyClick = (text, message) => {
  navigator.clipboard.writeText(text)
  toast.success(message);
}
    

    function formatDate(dateString) {
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      };
    
      const date = new Date(dateString);
      const formattedDate = date.toLocaleString("en-US", options);
    
      return formattedDate;
    }

function exportCSV() {
  fetch(`${config.baseUrl}/api/sales/export?id=${localStorage.getItem('viewRevenueId')}`)
  .then(response => response.blob())
  .then(blob => {
    toast.success("Downloaded CSV file");
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const filename ="ViewRevenue "+"_"+new Date().getDate()+"-" +(new Date().getMonth()+1)+"-" +new Date().getFullYear()+"_" +new Date().getHours()+"h-" +new Date().getMinutes()+"m-" +new Date().getSeconds()+"s.csv"
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
  });
}
  useEffect(() => {
    fetch(`${config.baseUrl}/api/sales/${localStorage.getItem('viewRevenueId')}`)
    .then(response => response.json())
    .then((data) =>{
        setSales(data.data)
        setLoading(false)
        
    })
    .catch((error)=> console.log(error))
  },[]);


  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main ref={componentRef}>

        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">



        <HeadBar 
        title={"View sales"} 
        description={"View the complete user sales in detail"}
        exportCSV={exportCSV}
        isVisible={true} />

        
<div>
            <Toaster />
          </div>
{loading && <p className='ml-[300px] p-[30px] font-bold text-[30px] text-slate-400'>Loading Data.. <img className='inline-block' src="./images/spin.gif" alt="" /></p>
}
{!loading && 
<div className='bg-white w-[90%] h-[100%] p-[25px] shadow-lg m-[30px] border-2 border-grey '>


<div className='px-[20px] py-[10px] mt-8'>
  
<label className='text-slate-700 inline-block w-[150px] text-sm  font-semibold'>Name   </label>
<span  className='text-slate-700 text-sm'>{sales?.name}<button onClick={()=>handleCopyClick(sales?.name, "Name has been copied")}><FiCopy className='text-blue- inline-block mx-1  text-green-400 hover:text-green-600'/></button></span>
</div>
<hr />
<div className='px-[20px] py-[10px] font-normal text-base'>
<label className='text-slate-700 inline-block w-[150px] text-sm   font-semibold'>Order ID  : </label>
<span className='text-slate-700  text-sm'>{sales?.orderid}<button onClick={()=>handleCopyClick(sales.orderid, "Order ID has been copied")}><FiCopy className='text-blue- inline-block mx-1  text-green-400 hover:text-green-600'/></button></span>
</div>
<hr />
<div className='px-[20px] py-[10px] mt-8'>
  
<label className='text-slate-700 inline-block w-[150px] text-sm  font-semibold'>Category   </label>
<span  className='text-slate-700 text-sm'>{sales?.category}<button onClick={()=>handleCopyClick(sales?.category, "Category has been copied")}><FiCopy className='text-blue- inline-block mx-1  text-green-400 hover:text-green-600'/></button></span>
</div>
<hr />
<div className='px-[20px] py-[10px] mt-8'>
  
<label className='text-slate-700 inline-block w-[150px] text-sm  font-semibold'>Product  </label>
<span  className='text-slate-700 text-sm'>{sales?.product}<button onClick={()=>handleCopyClick(sales?.product, "Product has been copied")}><FiCopy className='text-blue- inline-block mx-1  text-green-400 hover:text-green-600'/></button></span>
</div>


<hr />
<div className='px-[20px] py-[10px] font-normal text-base'>
<label className='text-slate-700 inline-block w-[150px] text-sm font-semibold'>Amount : </label>
<span  className='text-slate-700 text-sm'>{sales?.amount}<button onClick={()=>handleCopyClick(sales?.amount, "Amount has been copied")}><FiCopy className='text-blue- inline-block mx-1  text-green-400 hover:text-green-600'/></button></span>
</div>
<hr />

<div className='px-[20px] py-[10px] font-normal text-base'>
<label className='text-slate-700 inline-block w-[150px] text-sm  font-semibold'>Created on : </label>
<span  className='text-slate-700 text-sm'>{formatDate(sales?.createdOn)} <button onClick={()=>handleCopyClick(sales?.createdOn, "Revenue timestamp has been copied")}><FiCopy className='text-blue- inline-block mx-1  text-green-400 hover:text-green-600'/></button></span>
</div>

<hr />


<hr />
</div> }
</div>
        </main>

       

      </div>
    </div>
  );
}


export default ShowRevenue

