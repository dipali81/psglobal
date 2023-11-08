import { useState, useEffect , useRef } from 'react';
import toast, { Toaster } from "react-hot-toast";
import Sidebar from '../../shared/Sidebar';
import Header from '../../shared/Header';
import HeadBar from '../../components/HeadBar';
import config from '../../config/config';
import {FiCopy} from 'react-icons/fi'

const ShowQuery = () => {

  const componentRef = useRef(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [query, setQuery] = useState([])
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
  fetch(`${config.baseUrl}/api/viewquery/export?id=${localStorage.getItem('query_id')}`)
  .then(response => response.blob())
  .then(blob => {
    toast.success("Downloaded CSV file");
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const filename ="ViewQuery "+"_"+new Date().getDate()+"-" +(new Date().getMonth()+1)+"-" +new Date().getFullYear()+"_" +new Date().getHours()+"h-" +new Date().getMinutes()+"m-" +new Date().getSeconds()+"s.csv"
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
  });
}
  useEffect(() => {
    
    fetch(`${config.baseUrl}/api/showquery?id=${localStorage.getItem('query_id')}`)
    .then(response => response.json())
    .then((data) =>{
        setQuery(data.result)
        setLoading(false)
        
    })
    .catch((error)=> console.log(error))
  },[])



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
        title={"View Query"} 
        description={"View the complete user query in detail"}
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
<span  className='text-slate-700 text-sm'>{query.firstName +" "+ query.lastName}<button onClick={()=>handleCopyClick(query.name, "Name has been copied")}><FiCopy className='text-blue- inline-block mx-1  text-green-400 hover:text-green-600'/></button></span>
</div>
<hr />
<div className='px-[20px] py-[10px] font-normal text-base'>
<label className='text-slate-700 inline-block w-[150px] text-sm   font-semibold'>Phone  : </label>
<span className='text-blue-600 text-sm underline'><a href={`tel:${query.phone}`}> {query.phone}</a><button onClick={()=>handleCopyClick(query.phone, "Phone number has been copied")}><FiCopy className='text-blue- inline-block mx-1  text-green-400 hover:text-green-600'/></button></span>
</div>
<hr />
<div className='px-[20px] py-[10px] font-normal text-base'>
<label className='text-slate-700 inline-block w-[150px] text-sm  font-semibold'>Email : </label>
<span className='text-blue-600 text-sm underline'><a href={`mailto:${query.email}`}> {query.email}</a> <button onClick={()=>handleCopyClick(query.email, "Email address has been copied")}><FiCopy className='text-blue- inline-block mx-1  text-green-400 hover:text-green-600'/></button></span>
</div>
<hr />
<div className='px-[20px] py-[10px] font-normal text-base'>
<label className='text-slate-700 inline-block w-[150px] text-sm font-semibold'>Subject : </label>
<span  className='text-slate-700 text-sm'>{query.subject}<button onClick={()=>handleCopyClick(query.subject, "Subject has been copied")}><FiCopy className='text-blue- inline-block mx-1  text-green-400 hover:text-green-600'/></button></span>
</div>


<hr />
<div className='px-[20px] py-[10px] font-normal text-base'>
<label className='text-slate-700 inline-block w-[150px] text-sm font-semibold'>Query : </label>
<span  className='text-slate-700 text-sm'>{query.message}<button onClick={()=>handleCopyClick(query.message, "Query messages has been copied")}><FiCopy className='text-blue- inline-block mx-1  text-green-400 hover:text-green-600'/></button></span>
</div>
<hr />

<div className='px-[20px] py-[10px] font-normal text-base'>
<label className='text-slate-700 inline-block w-[150px] text-sm  font-semibold'>Registered on : </label>
<span  className='text-slate-700 text-sm'>{formatDate(query.createdOn)} <button onClick={()=>handleCopyClick(query.createdOn, "Query registration timestamp has been copied")}><FiCopy className='text-blue- inline-block mx-1  text-green-400 hover:text-green-600'/></button></span>
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


export default ShowQuery

