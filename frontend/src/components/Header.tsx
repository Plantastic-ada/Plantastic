import logo from "@/assets/img/plantastic_logo.png";
import { PiUserCircleGearFill } from "react-icons/pi";

export const Header = () => {
  return (
    <div>
      <div>
        <img
          src={logo}
          className="w-16 h-20 mt-1 ml-3 sm:w-24 sm:h-32 lg:w-32 lg:h-48 object-contain"
        />
        <div>
          <PiUserCircleGearFill color="white" className="w-8 h-12 sm:w-18 sm:h-24 lg:w-24 lg:h-32 absolute top-0 right-0 size-16 mt-3 mr-3" />
        </div>
      </div>
    </div>
  );
};
