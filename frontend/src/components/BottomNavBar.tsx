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
    <Box>
      <Fab
        sx={{
          position: "fixed",
          bottom: { xs: 40, sm: 50 },
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#2D3D2D",
          zIndex: 1001,
        }}
        component={Link}
        to="/add-plant"
      >
        <Box sx={{ fontSize: { xs: 20, sm: 24, md: 32 } }}>
          <RiAddLargeLine color="white" />
        </Box>
      </Fab>

      <Typography
        sx={{
          position: "fixed",
          bottom: { xs: 8, sm: 15 },
          left: "50%",
          transform: "translateX(-50%)",
          color: "white",
          fontSize: { xs: "0.75rem", sm: "0.875rem" },
          fontFamily: "Montserrat Alternates",
          zIndex: 1001,
          pointerEvents: "none",
        }}
      >
        Add a plant
      </Typography>

      <BottomNavigation
        className="!fixed !bottom-0 !left-0 !right-0 !z-[1000] !w-full !bg-[#2D3D2D]"
        value={value}
        onChange={handleChange}
        showLabels
        sx={{
          height: { xs: "64px", sm: "80px" },
          "& .MuiBottomNavigationAction-root": {
            color: "rgba(255, 255, 255, 0.7)",
            fontFamily: "Montserrat Alternates, sans-serif",
            "&.Mui-selected": {
              color: "white",
            },
            "& .MuiBottomNavigationAction-label": {
              fontFamily: "Montserrat Alternates, sans-serif",
            },
            "& .MuiSvgIcon-root, & svg": {
              fontSize: { xs: "20px", sm: "28px", md: "36px" },
            },
          },
        }}
      >
        <BottomNavigationAction
          label="Digital Garden"
          value="digital-garden"
          icon={<PiPlantBold />}
          className="!text-xs sm:!text-sm"
          component={Link}
          to="/home"
        />
        <BottomNavigationAction
          label="Encyclopedia"
          value="encyclopedia"
          icon={<BiSolidBookBookmark />}
          className="!text-xs sm:!text-sm"
          component={Link}
          to="/encyclopedia"
        />
        <div style={{ flex: 0.2 }} />
        <BottomNavigationAction
          label="Advices"
          value="advices"
          icon={<HiOutlineLightBulb />}
          className="!text-xs sm:!text-sm"
          component={Link}
          to="/advices"
        />
        <BottomNavigationAction
          label="Forum"
          value="forum"
          icon={<IoChatbubbleEllipsesOutline />}
          className="!text-xs sm:!text-sm"
          component={Link}
          to="/forum"
        />
      </BottomNavigation>
    </Box>
  );
}
