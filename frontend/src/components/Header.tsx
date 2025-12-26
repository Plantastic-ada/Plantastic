import logo from "@/assets/img/plantastic1_logo.png";
import { useNavigate } from "react-router";

export const Header = () => {
  const navigate = useNavigate();

  return (
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
  );
};
