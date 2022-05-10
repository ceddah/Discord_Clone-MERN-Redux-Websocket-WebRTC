import React, { useState } from "react";
import { styled } from "@mui/system";
import { connect } from "react-redux";
import { sendDirectMessage } from "../../realtimeConnection/socketConnection";

const MainContainer = styled("div")({
  height: "60px",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Input = styled("input")({
  backgroundColor: "#2F3136",
  width: "95%",
  height: "44px",
  color: "white",
  border: "none",
  borderRadius: "6px",
  fontSize: "14px",
  padding: "0 15px",
  outline: "none",
});

const NewMessageInput = ({ chosenChatDetails }) => {
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyPressed = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (message.length > 0) {
      sendDirectMessage({
        receiverUserId: chosenChatDetails.id,
        content: message,
      });
      setMessage("");
    }
  };

  return (
    <MainContainer>
      <Input
        placeholder={`Message  @${chosenChatDetails.name}`}
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyPressed}
      />
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ chat }) => {
  return { ...chat };
};

export default connect(mapStoreStateToProps)(NewMessageInput);
