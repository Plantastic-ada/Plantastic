import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import { Link } from "react-router-dom";
import { Box, Fab, BottomNavigationAction, Typography } from "@mui/material";
import { PiPlantBold } from "react-icons/pi";
import { BiSolidBookBookmark } from "react-icons/bi";
import { RiAddLargeLine } from "react-icons/ri";
import { HiOutlineLightBulb } from "react-icons/hi2";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState("digital garden");

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
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

  // bg-[#2D3D2D]
  // <Box>
  //   <Fab
  //     sx={{
  //       position: "fixed",
  //       bottom: { xs: 40, sm: 50 },
  //       left: "50%",
  //       transform: "translateX(-50%)",
  //       backgroundColor: "#2D3D2D",
  //       zIndex: 1001,
  //     }}
  //     component={Link}
  //     to="/add-plant"
  //   >
  //     <Box sx={{ fontSize: { xs: 20, sm: 24, md: 32 } }}>
  //       <RiAddLargeLine color="white" />
  //     </Box>
  //   </Fab>

  //     <Typography
  //       sx={{
  //         position: "fixed",
  //         bottom: { xs: 8, sm: 15 },
  //         left: "50%",
  //         transform: "translateX(-50%)",
  //         color: "white",
  //         fontSize: { xs: "0.75rem", sm: "0.875rem" },
  //         fontFamily: "Montserrat Alternates",
  //         zIndex: 1001,
  //         pointerEvents: "none",
  //       }}
  //     >
  //       Add a plant
  //     </Typography>

  //     <BottomNavigation
  //       className="!fixed !bottom-0 !left-0 !right-0 !z-[1000] !w-full !bg-[#2D3D2D]"
  //       value={value}
  //       onChange={handleChange}
  //       showLabels
  //       sx={{
  //         height: { xs: "64px", sm: "80px" },
  //         "& .MuiBottomNavigationAction-root": {
  //           color: "rgba(255, 255, 255, 0.7)",
  //           fontFamily: "Montserrat Alternates, sans-serif",
  //           "&.Mui-selected": {
  //             color: "white",
  //           },
  //           "& .MuiBottomNavigationAction-label": {
  //             fontFamily: "Montserrat Alternates, sans-serif",
  //           },
  //           "& .MuiSvgIcon-root, & svg": {
  //             fontSize: { xs: "20px", sm: "28px", md: "36px" },
  //           },
  //         },
  //       }}
  //     >
  //       <BottomNavigationAction
  //         label="Digital Garden"
  //         value="digital-garden"
  //         icon={<PiPlantBold />}
  //         className="!text-xs sm:!text-sm"
  //         component={Link}
  //         to="/home"
  //       />
  //       <BottomNavigationAction
  //         label="Encyclopedia"
  //         value="encyclopedia"
  //         icon={<BiSolidBookBookmark />}
  //         className="!text-xs sm:!text-sm"
  //         component={Link}
  //         to="/encyclopedia"
  //       />
  //       <div style={{ flex: 0.2 }} />
  //       <BottomNavigationAction
  //         label="Advices"
  //         value="advices"
  //         icon={<HiOutlineLightBulb />}
  //         className="!text-xs sm:!text-sm"
  //         component={Link}
  //         to="/advices"
  //       />
  //       <BottomNavigationAction
  //         label="Forum"
  //         value="forum"
  //         icon={<IoChatbubbleEllipsesOutline />}
  //         className="!text-xs sm:!text-sm"
  //         component={Link}
  //         to="/forum"
  //       />
  //     </BottomNavigation>
  //   </Box>
  // );
}
