import  { useState} from "react";
import { NavLink } from "react-router-dom";
import Header from "../../shared/Header";
import Sidebar from "../../shared/Sidebar";


function index() {


  //Default
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [sidebarOpen, setSidebarOpen] = useState(false);


 
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>






          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            
          <section className="main bg-white flex justify-center items-center overflow-y-auto z-0 top-0 w-[calc(100vw-300px)] right-0 min-h-[calc(100vh-70px)]">
          <div className='mt-[-90px] text-indigo-500'>
            
          <p className='font-bold text-[75px]'>Error 404!</p>
          <p className='font-semibold text-[25px] mb-5'>The page you are trying to access doesn&apos;t exist</p>
          <NavLink className="px-5 py-3 bg-indigo-400 text-white hover:bg-indigo-600 transition-all" to="/">Go to home</NavLink>
          </div>
        </section>
          </div>
       

         
        </main>
      </div>
    </div>
  );
}

export default index;
