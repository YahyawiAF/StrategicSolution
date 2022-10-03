import { Box, styled } from "@mui/material";
import { Link } from "react-router-dom";

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        display: flex;
        text-decoration: none;
        height: ${theme.header.height};
        font-weight: ${theme.typography.fontWeightBold};
        position: relative;
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
  return (
    <LogoWrapper to="/dashboard">
      <Box
        component="img"
        src="/static/image/medical.png"
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
