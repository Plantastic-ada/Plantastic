import { PiPlantBold } from "react-icons/pi";
import { BiSolidBookBookmark } from "react-icons/bi";
import { RiAddLargeLine } from "react-icons/ri";
import { HiOutlineLightBulb } from "react-icons/hi2";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

export default function BottomNavigation() {
  return (
    <div className="relative w-1/2 h-32 grid grid-cols-2 gap-[6.5rem] text-white">
      <div
        id="right-navbar"
        className="relative z-20 bg-[#2D3D2D] grid grid-cols-2 place-items-center rounded-r-[2rem] rounded-l-lg "
      >
        <button id="navbar-button" className="" title="digital-garden">
          <PiPlantBold size={"3.5rem"} />
        </button>
        <button id="navbar-button" title="encyclopedia">
          <BiSolidBookBookmark size={"3.5rem"} color={"amber-50/95"} />
        </button>
      </div>
      <div
        id="left-navbar"
        className="relative z-20 bg-[#2D3D2D] grid grid-cols-2 place-items-center rounded-l-[2rem] rounded-r-lg "
      >
        <button id="navbar-button" title="encyclopedia">
          <HiOutlineLightBulb size={"3.5rem"} />
        </button>
        <button id="navbar-button" title="encyclopedia">
          <IoChatbubbleEllipsesOutline size={"3.5rem"} />
        </button>
      </div>
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 h-24 w-24 bg-[#2D3D2D] rounded-full z-30">
        <button
          id="add-button"
          className="
      rounded-full w-full h-full 
      bg-gradient-to-br from-[#2D3D2D] from-50% to-[#4CAF50] 
      hover:from-[#4CAF50] hover:to-[#2D3D2D] shadow-lg hover:shadow-xl
      hover:-translate-y-1
      transition duration-700
      flex items-center justify-center
      group"
        >
          <div className="grid group-hover:-translate-y-1 transition duration-700">
            <RiAddLargeLine size={"3.5rem"} />
          </div>
        </button>
      </div>
      <div
        id="midddle-navbar"
        className="
        absolute z-10 bottom-0 h-full left-1/2 -translate-x-1/2 w-1/2 bg-red-300 rounded-t-[3rem] "
        
      ></div>
    </div>
  );
}
