// @mui
import { styled } from "@mui/material/styles";
import { Card, Box } from "@mui/material";
// hooks
import useResponsive from "~/hooks/useResponsive";
// components
import Page from "../PageWrapper";
import { Outlet } from "react-router-dom";
import { useAuth } from "~/contexts/authContext";
import { Navigate } from "react-router-dom";

const RootStyle = styled("div")(({ theme }) => ({
  background: "url(static/image/background-login.png)",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed",
  backgroundPositionX: "94%",
  backgroundPositionY: "center",
  backgroundSize: "1206px",
  backgroundColor: "rgba(249, 249, 249, 0.9)",
  backgroundBlendMode: "lighten",
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  flexBasis: "50%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "unset",
  backgroundColor: "#F3F5F9",
}));

export default function Login() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/patient" />;
  }
  const mdUp = useResponsive("up", "md");
  return (
    <Page title="Login">
      <RootStyle>
        <Outlet />
        {/* {mdUp && (
          <SectionStyle>
            <Box
              component="img"
              src="/static/image/dasiaGlassesLogo.png"
              //sx={{ width: 140, height: 40 }}
            />
          </SectionStyle>
        )} */}
      </RootStyle>
    </Page>
  );
}
