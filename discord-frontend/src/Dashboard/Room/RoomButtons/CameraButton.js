import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import { getfullScreenButtonStyles } from "./fullScreenButtonStyles";

const CameraButton = ({ isRoomMinimized, localStream }) => {
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const fullScreenStyles = getfullScreenButtonStyles();

  const handleToggleCamera = () => {
    localStream.getVideoTracks()[0].enabled = !cameraEnabled;

    setCameraEnabled(!cameraEnabled);
  };

  return (
    <IconButton
      style={isRoomMinimized ? { color: "white" } : fullScreenStyles}
      onClick={handleToggleCamera}
    >
      {cameraEnabled ? <VideocamIcon /> : <VideocamOffIcon />}
    </IconButton>
  );
};

export default CameraButton;
