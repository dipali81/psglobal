

import { VscVmActive } from "react-icons/vsc";
import { MdOutlineNewLabel, MdSubscriptions } from "react-icons/md";
import { HiCurrencyDollar } from "react-icons/hi";
import { FiUsers } from "react-icons/fi";
import { BsQuestionCircleFill } from "react-icons/bs";




// eslint-disable-next-line react/prop-types
function Block({index, title, count }) {

  return (
    <div className="flex  mr-4 scroll-hide flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg border border-slate-200 w-[300px] min-h-[120px]">
      <div className="px-4  pt-5 pb-5 ">
        
        <div className="flex justify-between mb-2 items-start border-teal-100">
        <header className="px-2 inline-block mr-2 mb-2">

        
          {index==1 && <MdOutlineNewLabel className=' bg-[#e6e6ff] rounded-full p-[10px] text-[26px]' color='rgb(108, 110, 231)' size={"2em"} alt="Icon 01" />}
          {index==2 && <VscVmActive className=' bg-[#e6e6ff] rounded-full p-[10px] text-[26px]' color='rgb(108, 110, 231)' size={"2em"} alt="Icon 02" />}
          {index==3 && <BsQuestionCircleFill className=' bg-[#e6e6ff] rounded-full p-[10px] text-[26px]' color='rgb(108, 110, 231)' size={"2em"} alt="Icon 03" />}
          {index==4 && <FiUsers className=' bg-[#e6e6ff] rounded-full p-[10px] text-[26px]' color='rgb(108, 110, 231)' size={"2em"} alt="Icon 03" />}
          {index==5 && <HiCurrencyDollar className=' bg-[#e6e6ff] rounded-full p-[10px] text-[26px]' color='rgb(108, 110, 231)' size={"2em"} alt="Icon 03" />}
          {index==6 && <MdSubscriptions className=' bg-[#e6e6ff] rounded-full p-[10px] text-[26px]' color='rgb(108, 110, 231)' size={"2em"} alt="Icon 03" />}
        
     
        
        </header>
        <div className="flex flex-col items-end">
            <div className="text-2xl font-bold text-slate-800 mr-2">{count}</div>
        </div>

          
        </div>
        <h2 className="  text-right text-[14px] font-md text-slate-500 mb-[2px]">{title}</h2>

      </div>

 
    </div>
  );
}

export default Block;
