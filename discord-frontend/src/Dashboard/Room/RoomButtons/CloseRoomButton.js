import React from "react";
import IconButton from "@mui/material/IconButton";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import { getfullScreenButtonStyles } from "./fullScreenButtonStyles";

const CloseRoomButton = ({ isRoomMinimized }) => {
  const handleLeaveRoom = () => {};
  const fullScreenStyles = getfullScreenButtonStyles({
    backgroundColor: "#F04746",
  });
  return (
    <IconButton
      style={isRoomMinimized ? { color: "#E94545" } : fullScreenStyles}
      onClick={handleLeaveRoom}
    >
      <AddIcCallIcon />
    </IconButton>
  );
};

export default CloseRoomButton;
