import logo from "@/assets/img/plantastic1_logo.png";
import { PiUserCircleGearFill } from "react-icons/pi";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { LuDroplets } from "react-icons/lu";
import Modal from "./Modal";
import { useGarden } from "../context/GardenContext";
import { WateringModal } from "./WateringModal";

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropDownIsOpen, setDropDownIsOpen] = useState(false);
  const { logout } = useAuth();
  const { plants } = useGarden();

  const navigate = useNavigate();
  const toogleDropDown = () => {
    setDropDownIsOpen(!dropDownIsOpen);
  };
  return (
    <div className="sticky top-0 z-20 bg-transparent  flex justify-between items-center h-40 ">
      {/* <div id="header"> */}
      <div>
        <img
          onClick={() => navigate("/")}
          src={logo}
          className="w-24 h-24 ml-4
          sm:w-24 sm:h-30 lg:w-48 sm:ml-5
          md: md:ml-6
          lg: lg:ml-1
          2xl:h-48 2xl:ml-6 
          object-contain"
        />
        <button>
          <LuDroplets
            color="white"
            onClick={() => setIsModalOpen(true)}
            className="
            w-14 h-14 mr-6
          sm:w-16 sm:h-16 sm:mr-4 
          md:w-14 md:h-14 md:mr-8
          2xl:w-24  2xl:h-24  2xl:mr-10"
          />
        </button>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <WateringModal onClose={() => setIsModalOpen(false)} />
        </Modal>
      </div>
      {dropDownIsOpen && (
        <div
          className="origin-top-right absolute right-0  w-56 rounded-md shadow-lg bg-amber-50/95 font-bellota ring-black ring-opacity-5 focus:outline-none z-30"
          role="menu"
        >
          <div className="py-1" role="none">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
              role="menuitem"
            >
              Profile
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
              role="menuitem"
            >
              Settings
            </a>
            <button
              onClick={logout}
              className="block px-4 py-2 mt-4 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
            >
              Logout
            </button>
          </div>
        </div>
      )}
      <div>
        <button className="">
          <PiUserCircleGearFill
            onClick={toogleDropDown}
            color="white"
            className="w-14 h-14 mr-6
          sm:w-16 sm:h-16 sm:mr-4 
          md:w-14 md:h-14 md:mr-8
          2xl:w-24  2xl:h-24  2xl:mr-10"
          />
        </button>
      </div>
      {/* </div> */}
    </div>
  );
};
