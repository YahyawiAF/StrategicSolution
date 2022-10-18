import { useContext } from "react";
import Scrollbar from "~/components/Scrollbar";
import { SidebarContext } from "~/contexts/SidebarContext";

import {
  Box,
  Drawer,
  styled,
  Divider,
  useTheme,
  darken,
  BoxTypeMap,
} from "@mui/material";

import SidebarMenu from "./SidebarMenu";
import Logo from "@components/LogoSign";

interface ISidebarWrapper {
  sidebarToggle: boolean;
}

const SidebarWrapper = styled(Box, {
  shouldForwardProp: prop => prop !== "sidebarToggle",
})<ISidebarWrapper>(
  ({ theme, sidebarToggle }) => `
        color: ${theme.colors.alpha.trueWhite[70]};
        position: relative;
        z-index: 7;
        height: 100%;
        width: ${sidebarToggle ? "250px" : theme.sidebar.width};
        minWidth: ${sidebarToggle ? "250px" : theme.sidebar.width};
`
);

function Sidebar() {
  const { sidebarToggle } = useContext(SidebarContext);
  const theme = useTheme();
  return (
    <>
      <SidebarWrapper
        sidebarToggle={sidebarToggle as boolean}
        sx={{
          display: {
            xs: "none",
            lg: "inline-block",
          },
          position: "fixed",
          left: 0,
          top: 0,
          background: "#282F6C",
        }}
      >
        <Scrollbar>
          <Box>
            <Box>
              <Logo />
            </Box>
          </Box>
          <Divider
            sx={{
              background: theme.colors.alpha.trueWhite[10],
              opacity: "0.1",
            }}
          />
          <SidebarMenu />
        </Scrollbar>
        <Divider
          sx={{
            background: theme.colors.alpha.trueWhite[10],
          }}
        />
      </SidebarWrapper>
    </>
  );
}

export default Sidebar;
