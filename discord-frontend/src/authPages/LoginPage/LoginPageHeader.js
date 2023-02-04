import React from "react";
import { Typography } from "@mui/material";

const LoginPageHeader = () => {
  return (
    <>
      <Typography
        style={{ textAlign: "center" }}
        variant="h5"
        sx={{ color: "white" }}
      >
        Welcome Back!
      </Typography>
      <Typography style={{ textAlign: "center" }} sx={{ color: "#b9bbbe" }}>
        We're so excited to see you again!
      </Typography>
    </>
  );
};

export default LoginPageHeader;
