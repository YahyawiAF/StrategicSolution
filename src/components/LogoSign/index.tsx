import { Box, styled } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { SidebarContext } from "~/contexts/SidebarContext";

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        display: flex;
        text-decoration: none;
        height: ${theme.header.height};
        font-weight: ${theme.typography.fontWeightBold};
        position: relative;
        margin-bottom: 46px;
`
);

const LogoSignWrapper = styled(Box)(
  () => `
        width: 52px;
        height: 38px;
        position: relative;
`
);

function Logo() {
  const { closeSidebar, sidebarToggle } = useContext(SidebarContext);
  return (
    <LogoWrapper to="/dashboard">
      <Box
        component="img"
        src={
          sidebarToggle
            ? "/static/image/StrategicSolutionsFullLogo.png"
            : "/static/image/StrategicSolutionsLogo.png"
        }
        sx={{
          position: "absolute",
          height: "64px",
          transform: "translate(-50%, -50%)",
          top: "50%",
          left: "50%",
        }}
      />
      {/* <LogoSignWrapper>
      </LogoSignWrapper> */}
    </LogoWrapper>
  );
}

export default Logo;
