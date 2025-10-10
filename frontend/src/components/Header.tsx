import logo from "@/assets/img/plantastic_logo.png";
import { useState } from "react";
import { PiUserCircleGearFill } from "react-icons/pi";
import { useNavigate } from "react-router";

export const Header = () => {
  let navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  return (
    <div className="sticky top-0 z-20 bg-transparent h-32 ">
      <div id="header" className="relative ">
        <img
          onClick={() => navigate("/")}
          src={logo}
          className="w-24 h-24 ml-4
          sm:w-24 sm:h-32 lg:w-48 sm:ml-5
          md: md:ml-6
          lg: lg:ml-1
          2xl:h-48 2xl:ml-6 
          object-contain"
        />
        <div className="absolute top-0 right-4 flex flex-col items-center gap-2">
        <PiUserCircleGearFill
          color="white"
          className="w-14 h-14 mr-6
          sm:w-16 sm:h-16 sm:mr-4 
          md:w-14 md:h-14 md:mr-8
          2xl:w-24  2xl:h-24  2xl:mr-10"
        />
        <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50">
          Logout
        </button>
        </div>
      </div>
    </div>
  );
};
