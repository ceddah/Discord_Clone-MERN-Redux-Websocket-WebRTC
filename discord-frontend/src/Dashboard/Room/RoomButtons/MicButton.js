import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import { getfullScreenButtonStyles } from "./fullScreenButtonStyles";

const MicButton = ({ isRoomMinimized, localStream }) => {
  const [micEnabled, setMicEnabled] = useState(true);
  const fullScreenStyles = getfullScreenButtonStyles();

  const handleToggleMic = () => {
    localStream.getAudioTracks()[0].enabled = !micEnabled;

    setMicEnabled(!micEnabled);
  };

  return (
    <IconButton
      style={isRoomMinimized ? { color: "white" } : fullScreenStyles}
      onClick={handleToggleMic}
    >
      {micEnabled ? <MicIcon /> : <MicOffIcon />}
    </IconButton>
  );
};

export default MicButton;
