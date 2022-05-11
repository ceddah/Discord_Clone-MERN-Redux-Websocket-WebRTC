import React from "react";
import { styled } from "@mui/system";
import ScreenShareButton from "./ScreenShareButton";
import MicButton from "./MicButton";
import CloseRoomButton from "./CloseRoomButton";
import CameraButton from "./CameraButton";

const MainContainer = styled("div")({
  height: "15%",
  width: "100%",
  backgroundColor: "#5865f2",
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const RoomButtons = ({ isRoomMinimized }) => {
  return (
    <MainContainer>
      <CameraButton isRoomMinimized={isRoomMinimized} />
      <ScreenShareButton isRoomMinimized={isRoomMinimized} />
      <MicButton isRoomMinimized={isRoomMinimized} />
      <CloseRoomButton isRoomMinimized={isRoomMinimized} />
    </MainContainer>
  );
};

export default RoomButtons;
