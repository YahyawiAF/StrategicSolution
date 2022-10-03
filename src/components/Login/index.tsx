// @mui
import React from "react";
import { styled } from "@mui/material/styles";
// import styled from "styled-components";
import { Box, Typography } from "@mui/material";
// hooks
import useResponsive from "~/hooks/useResponsive";

import LoginForm from "./LoginForm";
const Login: React.FC = () => {
  const mdUp = useResponsive("up", "md");
  return (
    <Box
      sx={{
        flex: 1,
        height: "100%",
        display: "flex",
      }}
    >
      <ContentStyle>
        <Typography variant="h4" gutterBottom>
          Hi, Welcome Back
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", mb: 5 }}>
          Enter your credentials to continue
        </Typography>
        <LoginForm />
      </ContentStyle>
    </Box>
  );
};

const ContentStyle = styled("div")(({ theme }) => ({
  // maxWidth: 480,
  maxWidth: 500,
  width: 500,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

export default Login;
