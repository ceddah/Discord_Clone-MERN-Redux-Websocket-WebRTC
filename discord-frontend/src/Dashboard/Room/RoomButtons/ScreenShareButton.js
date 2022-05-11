import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import { getfullScreenButtonStyles } from "./fullScreenButtonStyles";

const ScreenShare = ({ isRoomMinimized }) => {
  const [isScreenSharingActive, setIsScreenSharingActive] = useState(false);
  const fullScreenStyles = getfullScreenButtonStyles();

  const handleToggleScreenShare = () => {
    setIsScreenSharingActive(!isScreenSharingActive);
  };

  return (
    <IconButton
      style={isRoomMinimized ? { color: "white" } : fullScreenStyles}
      onClick={handleToggleScreenShare}
    >
      {isScreenSharingActive ? <StopScreenShareIcon /> : <ScreenShareIcon />}
    </IconButton>
  );
};

export default ScreenShare;
