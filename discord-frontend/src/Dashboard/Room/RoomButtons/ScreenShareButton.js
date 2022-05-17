import React from "react";
import IconButton from "@mui/material/IconButton";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import { getfullScreenButtonStyles } from "./fullScreenButtonStyles";
import * as webRTCHandler from "../../../realtimeConnection/webRTCHandler";

const constraints = {
  audio: false,
  video: true,
};

const ScreenShare = ({
  isRoomMinimized,
  localStream,
  screenSharingStream,
  setScreenSharingStream,
  isScreenSharingActive,
}) => {
  const fullScreenStyles = getfullScreenButtonStyles();

  const handleToggleScreenShare = async () => {
    if (!isScreenSharingActive) {
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getDisplayMedia(constraints);
      } catch (err) {
        console.log(
          "error occured when trying to get an access to screen share stream"
        );
      }

      if (stream) {
        setScreenSharingStream(stream);
        webRTCHandler.switchOutgoingTracks(stream);
      }
    } else {
      webRTCHandler.switchOutgoingTracks(localStream);
      screenSharingStream.getTracks().forEach((t) => t.stop());
      setScreenSharingStream(null);
    }
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
