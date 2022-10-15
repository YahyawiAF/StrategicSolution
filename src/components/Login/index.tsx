// @mui
import React from "react";
import { styled } from "@mui/material/styles";
// import styled from "styled-components";
import { Box, Typography, Stack, Link } from "@mui/material";
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
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h3"
        sx={{ position: "absolute", top: "0", left: "0", padding: "10px" }}
      >
        V.1.0.0.2
      </Typography>
      <Box
        component="img"
        src="/static/image/topLogo.png"
        sx={{
          marginBottom: "34px",
          marginTop: "42px",
        }}
      />
      <ContentStyle>
        <Typography variant="h4" gutterBottom>
          Hi, Welcome Back
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", mb: 5 }}>
          Enter your credentials to continue
        </Typography>
        <LoginForm />
      </ContentStyle>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ my: 2 }}
      >
        <Typography sx={{ color: "text.secondary" }}>
          Don{"'"}t have an account?
        </Typography>{" "}
        <Link variant="subtitle2" underline="hover">
          Sign up
        </Link>
      </Stack>
    </Box>
  );
};

const ContentStyle = styled("div")(({ theme }) => ({
  // maxWidth: 480,
  maxWidth: 509,
  width: 509,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  background: "#FFF",
  padding: "42px 42px",
  borderRadius: "10px",
  // height: "537px",
  ["form"]: {
    width: "100%",
  },
}));

export default Login;
