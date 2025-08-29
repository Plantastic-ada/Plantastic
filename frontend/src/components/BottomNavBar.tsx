import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import { Link } from "react-router-dom";
import { Box, Fab, BottomNavigationAction } from "@mui/material";
import { PiPlantBold } from "react-icons/pi";
import { BiSolidBookBookmark } from "react-icons/bi";
import { RiAddLargeLine } from "react-icons/ri";
import { HiOutlineLightBulb } from "react-icons/hi2";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState("digital garden");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Box sx={{'& > :not(style)': { m: 1 } }} >
    <BottomNavigation
      className="!fixed !bottom-0 !left-0 !right-0 !z-[1000] !w-full !bg-[#2D3D2D] !h-16 sm:!h-20"
      value={value}
      onChange={handleChange}
      showLabels
      sx={{
        "& .MuiBottomNavigationAction-root": {
          color: "rgba(255, 255, 255, 0.7)",
          fontFamily: "Montserrat Alternates, sans-serif",
          "&.Mui-selected": {
            color: "white",
          },
          "& .MuiBottomNavigationAction-label": {
            fontFamily: "Montserrat Alternates, sans-serif",
          },
        },
      }}
    >
      <BottomNavigationAction
        label="Digital Garden"
        value="digital-garden"
        icon={<PiPlantBold size={36}/> }
        className="!text-xs sm:!text-sm "
        component={Link}
        to="/home"
      />
      <BottomNavigationAction
        label="Encyclopedia"
        value="encyclopedia"
        icon={<BiSolidBookBookmark size={36}/>}
        className="!text-xs sm:!text-sm"
        component={Link}
        to="/encyclopedia"
      />
      <BottomNavigationAction
        label="Add a plant"
        value="add-a-plant"
        icon={<RiAddLargeLine size={42}/>}
        className="!text-base sm:!text-lg"
      />
      <BottomNavigationAction
        label="Advices"
        value="advices"
        icon={<HiOutlineLightBulb size={36}/>}
        className="!text-xs sm:!text-sm"
        component={Link}
        to="/advices"
      />
      <BottomNavigationAction
        label="Forum"
        value="forum"
        icon={<IoChatbubbleEllipsesOutline size={36}/>}
        className="!text-xs sm:!text-sm"
        component={Link}
        to="/forum"
      />
    </BottomNavigation>
    </Box>
  );
}
