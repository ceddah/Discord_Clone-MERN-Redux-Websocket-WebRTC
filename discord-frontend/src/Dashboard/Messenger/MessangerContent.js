import React, { useEffect } from "react";
import { styled } from "@mui/system";
import Messages from "./Messages/Messages";
import NewMessageInput from "./NewMessageInput";
import { getDirectChatHistory } from "../../realtimeConnection/socketConnection";

const Wrapper = styled("div")({
  flexGrow: 1,
});

const MessangerContent = ({ chosenChatDetails }) => {
  useEffect(() => {
    getDirectChatHistory({
      receiverUserId: chosenChatDetails.id,
    });
  }, [chosenChatDetails]);

  return (
    <Wrapper>
      <Messages />
      <NewMessageInput />
    </Wrapper>
  );
};

export default MessangerContent;
