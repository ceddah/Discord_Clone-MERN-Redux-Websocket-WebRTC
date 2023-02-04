import React from "react";
import { styled } from "@mui/system";
import Avatar from "../../../shared/components/Avatar";
import { Typography } from "@mui/material";

const MainContainer = styled("div")({
  width: "98%",
  display: "column",
  marginTop: "10px",
});

const MessagesHeader = ({ name = "" }) => {
  return (
    <MainContainer>
      <Avatar large username={name} />
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "white",
          margin: "10px 5px 0px",
        }}
      >
        {name}
      </Typography>
      <Typography sx={{ color: "#B9BBBE", margin: "0 5px" }}>
        This is the beggining of your conversation with {name}
      </Typography>
    </MainContainer>
  );
};

export default MessagesHeader;
